import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('access_token');
    
    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
      // Verify token and get fresh user data
      fetchUserData(accessToken);
    }
    setLoading(false);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to get user data');
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      localStorage.setItem('access_token', data.access);
      return data.access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return null;
    }
  };

  // Create an axios instance with interceptors
  const api = async (url, options = {}) => {
    let token = localStorage.getItem('access_token');

    if (!token) {
      token = await refreshToken();
      if (!token) {
        throw new Error('No token available');
      }
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (response.status === 401) {
      // Token might be expired, try to refresh
      const newToken = await refreshToken();
      if (newToken) {
        // Retry the request with new token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`,
            'Accept': 'application/json',
          },
          credentials: 'include',
        });
      }
      throw new Error('Authentication failed');
    }

    return response;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken, api, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 
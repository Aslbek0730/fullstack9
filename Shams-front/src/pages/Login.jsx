import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Store the tokens in localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
      // Get user data
      const userResponse = await fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': `Bearer ${data.access}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error('Failed to get user data');
      }

      // Update auth context with user data
      login({
        ...userData,
        token: data.access,
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Kirish</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Foydalanuvchi nomi</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Foydalanuvchi nomini kiriting"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Parol</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Parolni kiriting"
            />
          </div>
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>
        <p className="register-link">
          Ro&apos;yxatdan o&apos;tmaganmisiz? <a href="/register">Ro&apos;yxatdan o&apos;tish</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
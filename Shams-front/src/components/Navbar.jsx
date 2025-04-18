import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Shams Academy
        </Link>

        <div className="navbar-right">
          <ThemeToggle />
          
          {user ? (
            <div className="navbar-user">
              <span className="navbar-username">{user.username}</span>
              <button onClick={logout} className="navbar-logout">
                Chiqish
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-link">
                Kirish
              </Link>
              <Link to="/register" className="navbar-link navbar-link-primary">
                Ro'yxatdan o'tish
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
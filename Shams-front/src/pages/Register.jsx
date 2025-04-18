import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useFeedback } from '../contexts/FeedbackContext';
import '../styles/Form.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useFeedback();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showToast('Parollar mos kelmadi', 'error');
      return;
    }

    setLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      showToast('Muvaffaqiyatli ro\'yxatdan o\'tildi', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Ro'yxatdan o'tish</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Foydalanuvchi nomi</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Parol</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Parolni tasdiqlang</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="form-submit"
            disabled={loading}
          >
            {loading ? 'Kutilmoqda...' : 'Ro\'yxatdan o\'tish'}
          </button>
        </form>

        <div className="social-login">
          <button className="social-btn google">
            <FaGoogle className="social-icon" />
            Google
          </button>
          <button className="social-btn facebook">
            <FaFacebook className="social-icon" />
            Facebook
          </button>
        </div>

        <div className="form-footer">
          <p>
            Akkauntingiz bormi?{' '}
            <Link to="/login" className="form-link">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, api } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ism kiritilishi shart';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email kiritilishi shart';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Noto\'g\'ri email format';
    }
    
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Parollar mos kelmadi';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      await api.put('/profile/', updateData);
      
      setSuccessMessage('Ma\'lumotlar muvaffaqiyatli saqlandi');
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({
        submit: 'Ma\'lumotlarni saqlashda xatolik yuz berdi'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
    setSuccessMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profil</h1>
        {!isEditing ? (
          <button className="edit-button" onClick={handleEdit}>
            <FaEdit /> Tahrirlash
          </button>
        ) : (
          <div className="action-buttons">
            <button className="cancel-button" onClick={handleCancel}>
              <FaTimes /> Bekor qilish
            </button>
            <button 
              className="save-button" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <FaSave /> {isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        )}
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="error-message">
          {errors.submit}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-image">
          <FaUser className="user-icon" />
          {isEditing && (
            <div className="image-overlay">
              <span>Rasmni o'zgartirish</span>
            </div>
          )}
        </div>

        <form className="profile-form">
          <div className="form-group">
            <label>
              <FaUser className="input-icon" />
              Ism
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
              />
            ) : (
              <div className="profile-info">{user?.name}</div>
            )}
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope className="input-icon" />
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
            ) : (
              <div className="profile-info">{user?.email}</div>
            )}
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {isEditing && (
            <>
              <div className="form-group">
                <label>
                  <FaLock className="input-icon" />
                  Yangi parol
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Parolni o'zgartirmaslik uchun bo'sh qoldiring"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaLock className="input-icon" />
                  Parolni tasdiqlang
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
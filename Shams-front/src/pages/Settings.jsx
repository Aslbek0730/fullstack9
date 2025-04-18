import React, { useState } from 'react';
import { FaGlobe, FaBell, FaMoon, FaSun, FaLock, FaCheck } from 'react-icons/fa';
import './Settings.css';
import '../styles/shared.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    language: 'uz',
    emailNotifications: true,
    darkMode: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to change the password
    console.log('Password change submitted:', settings);
    setPasswordChanged(true);
    setTimeout(() => setPasswordChanged(false), 3000);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Sozlamalar</h1>

      <div className="settings-section">
        <div className="section-header">
          <FaGlobe />
          <h3>Til</h3>
        </div>
        <div className="section-content">
          <select
            name="language"
            value={settings.language}
            onChange={handleSettingChange}
            className="form-input"
          >
            <option value="uz">O&apos;zbek</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <FaBell />
          <h3>Bildirishnomalar</h3>
        </div>
        <div className="section-content">
          <label className="toggle-switch">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleSettingChange}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">Email bildirishnomalar</span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          {settings.darkMode ? <FaMoon /> : <FaSun />}
          <h3>Mavzu</h3>
        </div>
        <div className="section-content">
          <label className="toggle-switch">
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleSettingChange}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">Qorong&apos;u mavzu</span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <FaLock />
          <h3>Parolni o&apos;zgartirish</h3>
        </div>
        <div className="section-content">
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="form-group">
              <label className="form-label">Joriy parol</label>
              <input
                type="password"
                name="currentPassword"
                value={settings.currentPassword}
                onChange={handleSettingChange}
                placeholder="Joriy parolni kiriting"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Yangi parol</label>
              <input
                type="password"
                name="newPassword"
                value={settings.newPassword}
                onChange={handleSettingChange}
                placeholder="Yangi parolni kiriting"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Yangi parolni tasdiqlang</label>
              <input
                type="password"
                name="confirmPassword"
                value={settings.confirmPassword}
                onChange={handleSettingChange}
                placeholder="Yangi parolni qayta kiriting"
                className="form-input"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {passwordChanged ? (
                <>
                  <FaCheck /> Saqlandi
                </>
              ) : (
                'Parolni o&apos;zgartirish'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings; 
import { useState } from 'react';
import { FaMoon, FaSun, FaBell, FaLock, FaShieldAlt } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('uz');
  const [notifications, setNotifications] = useState({
    email: true,
    courseUpdates: true,
    promotions: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    twoFactorAuth: false,
    showProfile: true,
    showCourses: true
  });

  const languages = [
    { code: 'uz', name: 'O\'zbekcha' },
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' }
  ];

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePrivacyChange = (type) => {
    setPrivacySettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="settings-container">
      <h1>Sozlamalar</h1>
      
      {/* Appearance Settings */}
      <section className="settings-section">
        <h2>Ko`rinish</h2>
        <div className="setting-item">
          <div className="setting-label">
            <FaMoon className="setting-icon" />
            <span>Qorong`u rejim</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">
            <span>Til</span>
          </div>
          <select 
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="settings-section">
        <h2>Bildirishnomalar</h2>
        <div className="setting-item">
          <div className="setting-label">
            <FaBell className="setting-icon" />
            <span>Email bildirishnomalar</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">
            <span>Kurs yangilanishlari</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={notifications.courseUpdates}
              onChange={() => handleNotificationChange('courseUpdates')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">
            <span>Promo-aksiyalar</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={notifications.promotions}
              onChange={() => handleNotificationChange('promotions')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </section>

      {/* Privacy Settings */}
      <section className="settings-section">
        <h2>Maxfiylik</h2>
        <div className="setting-item">
          <div className="setting-label">
            <FaLock className="setting-icon" />
            <span>Ikki faktorli autentifikatsiya</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={privacySettings.twoFactorAuth}
              onChange={() => handlePrivacyChange('twoFactorAuth')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">
            <FaShieldAlt className="setting-icon" />
            <span>Profilni ko`rsatish</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={privacySettings.showProfile}
              onChange={() => handlePrivacyChange('showProfile')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-label">
            <span>Kurslarni ko`rsatish</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={privacySettings.showCourses}
              onChange={() => handlePrivacyChange('showCourses')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </section>
    </div>
  );
};

export default Settings; 
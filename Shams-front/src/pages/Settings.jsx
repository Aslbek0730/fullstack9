import React, { useState } from 'react';
import { FiSettings, FiMoon, FiBell, FiLock, FiGlobe } from 'react-icons/fi';
import './Settings.css';
import '../styles/shared.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [language, setLanguage] = useState('en');

  const settings = [
    {
      icon: <FiMoon />,
      title: 'Dark Mode',
      description: 'Enable dark mode for better night viewing',
      value: darkMode,
      onChange: setDarkMode
    },
    {
      icon: <FiBell />,
      title: 'Notifications',
      description: 'Receive notifications about new courses and updates',
      value: notifications,
      onChange: setNotifications
    },
    {
      icon: <FiLock />,
      title: 'Privacy',
      description: 'Make your profile private',
      value: privacy,
      onChange: setPrivacy
    },
    {
      icon: <FiGlobe />,
      title: 'Language',
      description: 'Change the language of the application',
      value: language,
      onChange: setLanguage,
      options: ['en', 'ru', 'uz']
    }
  ];

  return (
    <div className={`settings ${darkMode ? 'dark-mode' : ''}`}>
      <div className="settings-container">
        <div className="settings-card">
          <div className="settings-header">
            <FiSettings />
            <h2>Settings</h2>
          </div>
          <div className="settings-content">
            {settings.map((setting, index) => (
              <div key={index} className="settings-item">
                <div className="settings-info">
                  {setting.icon}
                  <div>
                    <h3>{setting.title}</h3>
                    <p>{setting.description}</p>
                  </div>
                </div>
                {setting.options ? (
                  <select
                    value={setting.value}
                    onChange={(e) => setting.onChange(e.target.value)}
                    className="settings-select"
                  >
                    {setting.options.map((option) => (
                      <option key={option} value={option}>
                        {option.toUpperCase()}
                      </option>
                    ))}
                  </select>
                ) : (
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={setting.value}
                      onChange={(e) => setting.onChange(e.target.checked)}
                    />
                    <span className="toggle-slider" />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 
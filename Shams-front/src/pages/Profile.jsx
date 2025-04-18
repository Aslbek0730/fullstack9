import React, { useState } from 'react';
import { FaCamera, FaUser, FaEnvelope, FaLock, FaHistory, FaChartLine } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [activeTab, setActiveTab] = useState('stats');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  // Sample activity data
  const activityStats = [
    { label: 'Kurslar soni', value: 12 },
    { label: 'Tugallangan testlar', value: 45 },
    { label: 'O\'rtacha ball', value: '92%' },
    { label: 'Faol kunlar', value: 156 }
  ];

  // Sample course history
  const courseHistory = [
    { name: 'Python asoslari', date: '2024-01-15', status: 'Tugallandi' },
    { name: 'Web dasturlash', date: '2024-02-01', status: 'Davom etmoqda' },
    { name: 'Ma\'lumotlar bazasi', date: '2024-02-20', status: 'Tugallandi' }
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <label className="image-upload-btn">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
          </label>
        </div>
        <h1>{formData.name}</h1>
        <p className="profile-email">{formData.email}</p>
      </div>

      <div className="profile-content">
        <div className="profile-form">
          <h2>Profil ma`lumotlari</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <FaUser />
                Ism
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ismingiz"
              />
            </div>

            <div className="form-group">
              <label>
                <FaEnvelope />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email manzilingiz"
              />
            </div>

            <div className="form-group">
              <label>
                <FaLock />
                Joriy parol
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Joriy parolingiz"
              />
            </div>

            <div className="form-group">
              <label>
                <FaLock />
                Yangi parol
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Yangi parol"
              />
            </div>

            <div className="form-group">
              <label>
                <FaLock />
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Parolni qayta kiriting"
              />
            </div>

            <button type="submit" className="save-btn">
              Saqlash
            </button>
          </form>
        </div>

        <div className="profile-stats">
          <div className="stats-tabs">
            <button
              className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              <FaChartLine /> Statistika
            </button>
            <button
              className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <FaHistory /> Tarix
            </button>
          </div>

          {activeTab === 'stats' ? (
            <div className="stats-grid">
              {activityStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="history-list">
              {courseHistory.map((course, index) => (
                <div key={index} className="history-item">
                  <div className="course-info">
                    <h3>{course.name}</h3>
                    <span className="course-date">{course.date}</span>
                  </div>
                  <span className={`course-status ${course.status === 'Tugallandi' ? 'completed' : 'in-progress'}`}>
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
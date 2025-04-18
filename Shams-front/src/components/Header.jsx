import { useState } from 'react';
import { BsSearch, BsBell, BsMoon, BsSun, BsQuestionCircle } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

function Header({ toggleSidebar, isDarkMode, toggleDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="logo">
          <h1>Shams Academy</h1>
        </div>
      </div>

      <div className="header-center">
        <div className="search-box">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Kurs yoki kitob qidirish..." />
        </div>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? <BsSun /> : <BsMoon />}
          </button>

          <div className="notifications">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BsBell />
              <span className="badge">3</span>
            </button>
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notification-item">
                  <p>Yangi kurs qo`shildi: Python dasturlash</p>
                  <span className="time">2 soat oldin</span>
                </div>
                <div className="notification-item">
                  <p>Test natijalari tayyor</p>
                  <span className="time">Kecha</span>
                </div>
              </div>
            )}
          </div>

          <div className="profile-menu">
            <button 
              className="profile-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img 
                src={user?.avatar || '/default-avatar.png'} 
                alt="Profile" 
                className="profile-avatar"
              />
              <span className="profile-name">{user?.name || 'Foydalanuvchi'}</span>
            </button>
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <img src={user?.avatar || '/default-avatar.png'} alt="Profile" />
                  <div>
                    <h4>{user?.name || 'Foydalanuvchi'}</h4>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div className="dropdown-menu">
                  <a href="/profile">Profil</a>
                  <a href="/settings">Sozlamalar</a>
                  {user?.isAdmin && (
                    <>
                      <a href="/admin/courses">Kurslar boshqaruvi</a>
                      <a href="/admin/users">Foydalanuvchilar</a>
                      <a href="/admin/stats">Statistika</a>
                    </>
                  )}
                  <button onClick={logout}>Chiqish</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Button */}
      <button className="ai-assistant-btn">
        <FaRobot />
      </button>

      {/* Help Center Button */}
      <button className="help-center-btn">
        <BsQuestionCircle />
      </button>
    </header>
  );
}

export default Header; 
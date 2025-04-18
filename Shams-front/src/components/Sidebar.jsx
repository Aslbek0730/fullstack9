import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  BsHouse, 
  BsBook, 
  BsCollection, 
  BsClipboardCheck,
  BsRobot,
  BsPerson,
  BsCreditCard,
  BsGear,
  BsBoxArrowRight
} from 'react-icons/bs';
import LogoutModal from './LogoutModal';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: <BsHouse />, text: 'Bosh sahifa' },
    { path: '/courses', icon: <BsBook />, text: 'Kurslar' },
    { path: '/library', icon: <BsCollection />, text: 'Kutubxona' },
    { path: '/tests', icon: <BsClipboardCheck />, text: 'Testlar' },
    { path: '/ai-assistant', icon: <BsRobot />, text: 'AI Yordamchi' },
    { path: '/profile', icon: <BsPerson />, text: 'Profil' },
    { path: '/payments', icon: <BsCreditCard />, text: 'To\'lovlar' },
    { path: '/settings', icon: <BsGear />, text: 'Sozlamalar' }
  ];

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Shams Akademiyasi</h3>
        </div>
        
        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.text}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          <button 
            className="logout-button"
            onClick={() => setShowLogoutModal(true)}
          >
            <span className="logout-icon"><BsBoxArrowRight /></span>
            <span className="menu-text">Chiqish</span>
          </button>
        </div>
      </div>

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
}

export default Sidebar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BsHouse,
  BsBook,
  BsCollection,
  BsClipboardCheck,
  BsRobot,
  BsPerson,
  BsCreditCard,
  BsGear,
  BsSearch,
  BsChevronLeft,
  BsChevronRight
} from 'react-icons/bs';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/dashboard', icon: <BsHouse size={20} />, label: 'Bosh sahifa' },
    { path: '/courses', icon: <BsBook size={20} />, label: 'Kurslar' },
    { path: '/library', icon: <BsCollection size={20} />, label: 'Kutubxona' },
    { path: '/tests', icon: <BsClipboardCheck size={20} />, label: 'Testlar' },
    { path: '/ai-assistant', icon: <BsRobot size={20} />, label: 'AI Yordamchi' },
    { path: '/profile', icon: <BsPerson size={20} />, label: 'Profil' },
    { path: '/payments', icon: <BsCreditCard size={20} />, label: 'To\'lovlar' },
    { path: '/settings', icon: <BsGear size={20} />, label: 'Sozlamalar' }
  ];

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  // Auto-close on small screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <span className="logo">Shams Akademiyasi</span>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <BsChevronLeft size={20} /> : <BsChevronRight size={20} />}
        </button>
      </div>

      <ul className="sidebar-menu">
        <li className="search-box">
          <i><BsSearch size={18} /></i>
          <input type="text" placeholder="Qidirish..." />
        </li>

        {menuItems.map(item => (
          <li 
            key={item.path} 
            className={location.pathname === item.path ? 'active' : ''}
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {isOpen && <span className="label">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
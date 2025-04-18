import { useNavigate } from 'react-router-dom';
import { BsBell } from 'react-icons/bs';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const userName = "John Doe"; // This should come from your auth context/state

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Shams Akademiyasi</h1>
      </div>
      <div className="navbar-items">
        <div className="notification-icon">
          <BsBell size={20} />
          <span className="notification-badge">3</span>
        </div>
        <span className="user-name">{userName}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Chiqish
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
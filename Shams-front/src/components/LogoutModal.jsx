import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Rostdan chiqmoqchimisiz?</h2>
        <p>Chiqish orqali siz tizimdan chiqib ketasiz va qayta kirish uchun login qilishingiz kerak bo`ladi.</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Yo`q
          </button>
          <button className="confirm-btn" onClick={handleLogout}>
            Ha
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal; 
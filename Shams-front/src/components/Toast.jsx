import { useEffect } from 'react';
import { FaCheck, FaTimes, FaInfo } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck />;
      case 'error':
        return <FaTimes />;
      case 'info':
        return <FaInfo />;
      default:
        return null;
    }
  };

  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">
        <p>{message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast; 
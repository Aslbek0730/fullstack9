import { FaSpinner } from 'react-icons/fa';
import './Loading.css';

const Loading = ({ fullScreen = false, message = 'Yuklanmoqda...' }) => {
  return (
    <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loading-content">
        <FaSpinner className="loading-spinner" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loading; 
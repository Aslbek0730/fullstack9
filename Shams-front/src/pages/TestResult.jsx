import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrophy, FaChartBar, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/shared.css';
import './TestResult.css';

const TestResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };
  const percentage = Math.round((score / total) * 100);

  const getResultMessage = () => {
    if (percentage >= 90) return 'Ajoyib! Siz juda yaxshi natija ko\'rsatdingiz!';
    if (percentage >= 70) return 'Yaxshi! Siz yaxshi natija ko\'rsatdingiz.';
    if (percentage >= 50) return 'Qoniqarli. Yana bir bor urinib ko\'ring.';
    return 'Afsuski, siz testdan o\'ta olmadingiz. Yana bir bor urinib ko\'ring.';
  };

  return (
    <div className="test-result">
      <div className="result-header">
        <h2>Test Natijalari</h2>
        <div className={`result-badge ${percentage >= 50 ? 'success' : 'fail'}`}>
          {percentage}%
        </div>
      </div>

      <div className="result-message">
        <p>{getResultMessage()}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-content">
            <h3>To`g`ri javoblar</h3>
            <p>{score} / {total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <h3>Foiz</h3>
            <p>{percentage}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>Vaqt</h3>
            <p>30 daqiqa</p>
          </div>
        </div>
      </div>

      <div className="result-actions">
        <button 
          className="action-btn retry"
          onClick={() => navigate('/tests')}
        >
          Boshqa testlar
        </button>
        <button 
          className="action-btn review"
          onClick={() => navigate('/test-interface/1')}
        >
          Qayta ko`rish
        </button>
      </div>
    </div>
  );
};

export default TestResult; 
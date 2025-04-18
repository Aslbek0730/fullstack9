import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaChartBar } from 'react-icons/fa';
import '../styles/shared.css';
import './Tests.css';

const Tests = () => {
  const navigate = useNavigate();
  const [tests] = useState([
    {
      id: 1,
      title: 'Python Dasturlash Asoslari',
      description: 'Python dasturlash tilining asosiy tushunchalari va amaliy misollar',
      totalQuestions: 20,
      timeLimit: 30,
      progress: 0,
      completed: false
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Ma\'lumotlar tahlili va sun\'iy intellekt asoslari',
      totalQuestions: 25,
      timeLimit: 45,
      progress: 15,
      completed: false
    },
    {
      id: 3,
      title: 'Web Development',
      description: 'Frontend va Backend dasturlash asoslari',
      totalQuestions: 30,
      timeLimit: 60,
      progress: 30,
      completed: true
    }
  ]);

  const handleTestAction = (test) => {
    if (test.completed) {
      navigate(`/test-result/${test.id}`);
    } else {
      navigate(`/test-interface/${test.id}`);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Testlar</h1>

      <div className="tests-grid">
        {tests.map(test => (
          <div key={test.id} className="test-card">
            <div className="test-content">
              <h3>{test.title}</h3>
              <p className="description">{test.description}</p>
              <div className="test-info">
                <span className="info-item">
                  <strong>{test.totalQuestions}</strong> savol
                </span>
                <span className="info-item">
                  <strong>{test.timeLimit}</strong> daqiqa
                </span>
              </div>
              {test.progress > 0 && !test.completed && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(test.progress / test.totalQuestions) * 100}%` }}
                    />
                  </div>
                  <span className="progress-text">
                    {test.progress}/{test.totalQuestions} savol
                  </span>
                </div>
              )}
            </div>
            <div className="test-actions">
              <button
                className={`action-btn ${test.completed ? 'view-results' : 'start-test'}`}
                onClick={() => handleTestAction(test)}
              >
                {test.completed ? (
                  <>
                    <FaChartBar /> Natijalarni ko'rish
                  </>
                ) : (
                  <>
                    <FaPlay /> {test.progress > 0 ? 'Davom ettirish' : 'Boshlash'}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tests;
import React, { useState } from 'react';
import { FaPlay, FaRedo, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Tests.css';

const Tests = () => {
  const [expandedTest, setExpandedTest] = useState(null);

  // Sample data for upcoming tests
  const upcomingTests = [
    {
      id: 1,
      title: 'Matematika 1-semestr',
      subject: 'Matematika',
      date: '2024-03-15',
      duration: '60 daqiqa',
      questions: 30,
      description: '1-semestr bo\'yicha umumiy bilimlarni tekshirish uchun test'
    },
    {
      id: 2,
      title: 'Fizika 2-modul',
      subject: 'Fizika',
      date: '2024-03-20',
      duration: '45 daqiqa',
      questions: 25,
      description: 'Mexanika bo\'limi bo\'yicha test'
    }
  ];

  // Sample data for completed tests
  const completedTests = [
    {
      id: 3,
      title: 'Ona tili 1-semestr',
      subject: 'Ona tili',
      date: '2024-02-28',
      score: 85,
      total: 100,
      timeSpent: '45 daqiqa',
      correctAnswers: 34,
      totalQuestions: 40
    },
    {
      id: 4,
      title: 'Ingliz tili 2-modul',
      subject: 'Ingliz tili',
      date: '2024-03-05',
      score: 92,
      total: 100,
      timeSpent: '50 daqiqa',
      correctAnswers: 46,
      totalQuestions: 50
    }
  ];

  const toggleExpand = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  return (
    <div className="tests-container">
      <h1>Testlar</h1>
      
      {/* Upcoming Tests Section */}
      <section className="tests-section">
        <h2>Boshlanmagan testlar</h2>
        <div className="tests-grid">
          {upcomingTests.map(test => (
            <div key={test.id} className="test-card">
              <div className="test-header">
                <h3>{test.title}</h3>
                <span className="test-subject">{test.subject}</span>
              </div>
              
              <div className="test-details">
                <div className="test-info">
                  <span>Sana: {test.date}</span>
                  <span>Davomiyligi: {test.duration}</span>
                  <span>Savollar: {test.questions}</span>
                </div>
                
                <button className="start-btn">
                  <FaPlay /> Boshlash
                </button>
              </div>
              
              <div className="test-description">
                <p>{test.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Tests Section */}
      <section className="tests-section">
        <h2>Tugallangan testlar</h2>
        <div className="tests-grid">
          {completedTests.map(test => (
            <div key={test.id} className="test-card completed">
              <div className="test-header">
                <h3>{test.title}</h3>
                <span className="test-subject">{test.subject}</span>
              </div>
              
              <div className="test-score">
                <div className="score-display">
                  <span className="score">{test.score}</span>
                  <span className="score-total">/{test.total}</span>
                </div>
                <div className="score-percentage">
                  {(test.score / test.total * 100).toFixed(0)}%
                </div>
              </div>
              
              <div className="test-details">
                <div className="test-info">
                  <span>Sana: {test.date}</span>
                  <span>Sarflangan vaqt: {test.timeSpent}</span>
                  <span>To`g`ri javoblar: {test.correctAnswers}/{test.totalQuestions}</span>
                </div>
                
                <button className="retake-btn">
                  <FaRedo /> Qayta ishlash
                </button>
              </div>
              
              <div className="test-expand" onClick={() => toggleExpand(test.id)}>
                {expandedTest === test.id ? (
                  <>
                    <span>Yopish</span>
                    <FaChevronUp />
                  </>
                ) : (
                  <>
                    <span>Batafsil</span>
                    <FaChevronDown />
                  </>
                )}
              </div>
              
              {expandedTest === test.id && (
                <div className="test-expanded-content">
                  <div className="test-stats">
                    <div className="stat-item">
                      <span className="stat-label">To`g`ri javoblar</span>
                      <span className="stat-value">{test.correctAnswers}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Noto`g`ri javoblar</span>
                      <span className="stat-value">{test.totalQuestions - test.correctAnswers}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Sarflangan vaqt</span>
                      <span className="stat-value">{test.timeSpent}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tests;
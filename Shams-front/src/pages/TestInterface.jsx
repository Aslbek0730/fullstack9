import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './TestInterface.css';

const TestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock test data - replace with actual API data
  const test = {
    id: testId,
    title: 'Python Dasturlash Testi',
    questions: [
      {
        id: 1,
        question: "Python dasturlash tilida qanday o'zgaruvchi e'lon qilinadi?",
        options: [
          { id: 'a', text: 'var x = 5' },
          { id: 'b', text: 'let x = 5' },
          { id: 'c', text: 'x = 5' },
          { id: 'd', text: 'const x = 5' }
        ],
        correctAnswer: 'c'
      },
      // Add more questions...
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Calculate score and navigate to results
    const score = calculateScore();
    setTimeout(() => {
      navigate(`/test-result/${testId}`, { 
        state: { 
          score,
          totalQuestions: test.questions.length,
          answers
        }
      });
    }, 1000);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    test.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / test.questions.length) * 100);
  };

  const currentQ = test.questions[currentQuestion];

  return (
    <div className="test-interface">
      <div className="test-header">
        <h1>{test.title}</h1>
        <div className="timer">
          <span className="time">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="question-card">
        <div className="question-progress">
          Savol {currentQuestion + 1}/{test.questions.length}
        </div>
        <h2 className="question-text">{currentQ.question}</h2>
        <div className="options">
          {currentQ.options.map(option => (
            <label 
              key={option.id}
              className={`option ${answers[currentQ.id] === option.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={`question-${currentQ.id}`}
                value={option.id}
                checked={answers[currentQ.id] === option.id}
                onChange={() => handleOptionSelect(currentQ.id, option.id)}
              />
              <span className="option-text">{option.text}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="test-footer">
        {currentQuestion < test.questions.length - 1 ? (
          <button className="btn-next" onClick={handleNext}>
            Keyingi <FaArrowRight />
          </button>
        ) : (
          <button 
            className={`btn-submit ${isSubmitting ? 'submitting' : ''}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TestInterface; 
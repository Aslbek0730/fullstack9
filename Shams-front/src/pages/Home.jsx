import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaBook, FaBookReader } from 'react-icons/fa';
import '../styles/shared.css';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCourses = () => {
    navigate('/courses');
  };

  const handleLibrary = () => {
    navigate('/library');
  };

  return (
    <div className="page-container">
      <div className="home-hero">
        <h1 className="page-title">Shams Academy</h1>
        <p className="hero-description">
          Bilim va ko&apos;nikmalaringizni rivojlantiring
        </p>
      </div>

      <div className="home-buttons">
        <button className="btn btn-primary" onClick={handleRegister}>
          <FaUserPlus /> Ro&apos;yxatdan o&apos;tish
        </button>
        <button className="btn btn-outline" onClick={handleLogin}>
          <FaSignInAlt /> Kirish
        </button>
      </div>

      <div className="home-sections">
        <div className="section-card" onClick={handleCourses}>
          <div className="section-icon">
            <FaBook />
          </div>
          <h3>Kurslar</h3>
          <p>Professional kurslar va darsliklar</p>
        </div>

        <div className="section-card" onClick={handleLibrary}>
          <div className="section-icon">
            <FaBookReader />
          </div>
          <h3>Kutubxona</h3>
          <p>Foydali kitoblar va resurslar</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 
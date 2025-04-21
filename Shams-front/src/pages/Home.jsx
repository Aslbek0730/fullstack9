import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaBook, FaBookReader, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/shared.css';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const slides = [
    {
      type: 'course',
      title: "Yangi 'Sun'iy intellekt asoslari' kursi ishga tushdi!",
      description: "Zamonaviy texnologiyalar olamiga sayohat qiling. AI asoslarini o'rganing va kelajak kasblariga tayyorlaning.",
      image: '/images/ai-course.jpg',
      buttonText: "Hoziroq boshlash",
      buttonLink: "/courses/ai-basics"
    },
    {
      type: 'promo',
      title: "Haftalik testlar aksiyasi",
      description: "Top 5 ta o'quvchiga eksklyuziv sovg'alar va sertifikatlar",
      image: '/images/promo.jpg',
      buttonText: "Qatnashish",
      buttonLink: "/tests"
    },
    {
      type: 'inspiration',
      title: "Imkoniyat yaratish — bu ixtirochining kuchidir",
      author: "Elon Musk",
      image: '/images/inspiration.jpg',
      buttonText: "Batafsil",
      buttonLink: "/about"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
    <div className={`home ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="slider-container">
        <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <div className="slide-image">
                <img src={slide.image} alt={slide.title} />
                <div className="image-overlay" />
              </div>
              <div className="slide-content">
                <h2>{slide.title}</h2>
                {slide.description && <p>{slide.description}</p>}
                {slide.author && <p className="author">— {slide.author}</p>}
                <a href={slide.buttonLink} className="slide-button">
                  {slide.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-nav prev" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="slider-nav next" onClick={nextSlide}>
          <FaChevronRight />
        </button>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
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
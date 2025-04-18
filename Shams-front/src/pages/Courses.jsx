import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './Courses.css';

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [level, setLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API data
  const courses = [
    {
      id: 1,
      title: 'Python Dasturlash',
      image: '/images/courses/python.jpg',
      category: 'Dasturlash',
      level: 'Beginner',
      price: 'Bepul',
      description: 'Python dasturlash tilini o\'rganing',
    },
    {
      id: 2,
      title: 'Web Dasturlash',
      image: '/images/courses/web.jpg',
      category: 'Web',
      level: 'Advanced',
      price: 'Premium',
      description: 'Modern web dasturlash texnologiyalari',
    },
    // Add more courses...
  ];

  const categories = [
    { id: 'all', name: 'Barchasi' },
    { id: 'programming', name: 'Dasturlash' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Mobil' },
    { id: 'ai', name: 'Sun\'iy Intellekt' },
  ];

  const levels = [
    { id: 'all', name: 'Barchasi' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'O\'rta' },
    { id: 'advanced', name: 'Advanced' },
  ];

  const priceRanges = [
    { id: 'all', name: 'Barchasi' },
    { id: 'free', name: 'Bepul' },
    { id: 'premium', name: 'Premium' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesLevel = level === 'all' || course.level === level;
    const matchesPrice = priceRange === 'all' || course.price === priceRange;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesPrice && matchesSearch;
  });

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Kurslar</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Kurslarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="courses-container">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Kategoriya</h3>
            <div className="filter-options">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Daraja</h3>
            <div className="filter-options">
              {levels.map(lvl => (
                <button
                  key={lvl.id}
                  className={`filter-btn ${level === lvl.id ? 'active' : ''}`}
                  onClick={() => setLevel(lvl.id)}
                >
                  {lvl.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Narx</h3>
            <div className="filter-options">
              {priceRanges.map(range => (
                <button
                  key={range.id}
                  className={`filter-btn ${priceRange === range.id ? 'active' : ''}`}
                  onClick={() => setPriceRange(range.id)}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-level">{course.level}</div>
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="course-category">{course.category}</span>
                  <span className="course-price">{course.price}</span>
                </div>
                <Link to={`/course/${course.id}`} className="course-btn">
                  Boshlash
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
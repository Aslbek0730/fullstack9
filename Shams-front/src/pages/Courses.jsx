import { useState } from 'react';
import { FaSearch, FaBook, FaClock, FaUserGraduate } from 'react-icons/fa';
import './Courses.css';

function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample categories
  const categories = [
    { id: 'all', name: 'Barchasi' },
    { id: 'programming', name: 'Dasturlash' },
    { id: 'design', name: 'Dizayn' },
    { id: 'business', name: 'Biznes' },
    { id: 'language', name: 'Tillar' },
  ];

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: 'Web Dasturlash Asoslari',
      description: 'HTML, CSS va JavaScript asoslarini o\'rganing',
      category: 'programming',
      duration: '8 hafta',
      students: 1200,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      title: 'UI/UX Dizayn',
      description: 'Zamonaviy interfeyslar yaratish san\'ati',
      category: 'design',
      duration: '6 hafta',
      students: 850,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      title: 'Biznes Menejmenti',
      description: 'Biznesni boshqarish va rivojlantirish',
      category: 'business',
      duration: '10 hafta',
      students: 650,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 4,
      title: 'Ingliz Tili',
      description: 'Ingliz tilini professional darajada o\'rganing',
      category: 'language',
      duration: '12 hafta',
      students: 2000,
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Kurslar</h1>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Kurslarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-image">
              <img src={course.image} alt={course.title} />
            </div>
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span><FaClock /> {course.duration}</span>
                <span><FaUserGraduate /> {course.students} o`quvchi</span>
              </div>
              <button className="continue-btn">
                <FaBook /> Davom etish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`nav ${isScrolled ? 'affix' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/">Shams Academy</Link>
        </div>
        <div className={`main_list ${isMenuOpen ? 'show_list' : ''}`}>
          <ul className="navlinks">
            <li><Link to="/library">Kutubxona</Link></li>
            <li><Link to="/tests">Testlar</Link></li>
            {user && (
              <li>
                <button className="logout-btn" onClick={logout}>
                  <BsBoxArrowRight size={20} />
                  <span>Chiqish</span>
                </button>
              </li>
            )}
          </ul>
        </div>
        <span className={`navTrigger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
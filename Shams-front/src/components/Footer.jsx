import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTelegram, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ isSidebarOpen }) => {
  return (
    <footer className={`footer ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Shams Akademiyasi</h3>
          <p>O'zbekistonning eng yirik onlayn ta'lim platformasi</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Tezkor havolalar</h3>
          <ul>
            <li><Link to="/">Bosh sahifa</Link></li>
            <li><Link to="/courses">Kurslar</Link></li>
            <li><Link to="/library">Kutubxona</Link></li>
            <li><Link to="/profile">Profil</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Biz bilan bog'laning</h3>
          <ul>
            <li>Email: info@shams.uz</li>
            <li>Telefon: +998 90 123 45 67</li>
            <li>Manzil: Toshkent shahri</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shams Akademiyasi. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
};

export default Footer;
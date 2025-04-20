import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="row social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      </div>

      <div className="row">
        <ul>
          <li><Link to="/contact">Biz bilan bog`lanish</Link></li>
          <li><Link to="/services">Xizmatlar</Link></li>
          <li><Link to="/privacy">Maxfiylik siyosati</Link></li>
          <li><Link to="/terms">Foydalanish shartlari</Link></li>
          <li><Link to="/career">Ish o`rinlari</Link></li>
        </ul>
      </div>

      <div className="row copyright">
        Shams Academy © {new Date().getFullYear()} - Barcha huquqlar himoyalangan
      </div>
    </footer>
  );
}

export default Footer;
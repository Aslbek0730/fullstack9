import { FaGraduationCap, FaBook, FaRobot } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="platform-intro">
          <h1>Shams Academy</h1>
          <p className="intro-text">
            Shams Academy - bu zamonaviy ta&apos;lim platformasi bo&apos;lib, sizga sifatli bilim va ko&apos;nikmalarni 
            o&apos;zlashtirish imkoniyatini beradi. Bizning platformamizda siz turli xil kurslar, elektron 
            kitoblar va sun&apos;iy intellekt yordamchisi bilan ishlash imkoniyatiga ega bo&apos;lasiz.
          </p>
        </div>

        <div className="main-buttons">
          <button className="main-btn courses-btn">
            <FaGraduationCap className="btn-icon" />
            <span>Kurslarga o&apos;tish</span>
          </button>
          <button className="main-btn library-btn">
            <FaBook className="btn-icon" />
            <span>Kutubxonaga kirish</span>
          </button>
          <button className="main-btn ai-btn">
            <FaRobot className="btn-icon" />
            <span>AI yordamchi</span>
          </button>
        </div>

        {user && (
          <div className="user-stats">
            <h2>Statistika</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Kurslar</h3>
                <p className="stat-value">5</p>
                <p className="stat-label">o&apos;zlashtirilgan</p>
              </div>
              <div className="stat-card">
                <h3>Faollik</h3>
                <p className="stat-value">3 kun</p>
                <p className="stat-label">oxirgi kirish</p>
              </div>
              <div className="stat-card">
                <h3>Kitoblar</h3>
                <p className="stat-value">12</p>
                <p className="stat-label">o&apos;qilgan</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home; 
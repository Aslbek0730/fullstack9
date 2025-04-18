import { Link } from 'react-router-dom';
import { BsBook, BsCollection, BsRobot, BsArrowRight } from 'react-icons/bs';
import './Home.css';

function Home() {
  return (
    <div className="public-container">
      <div className="home">
        <section className="hero">
          <h1>Shams Akademiyasi Ixtirochilar Maktabi</h1>
          <p>Bolalar va talabalar uchun ijodkorlik, ixtirochilik va IT ko`nikmalari</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Ro`yxatdan o`tish</Link>
            <Link to="/login" className="btn btn-outline-light">Kirish</Link>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <BsBook className="feature-icon" />
            <h3>Kurslar</h3>
            <p>Zamonaviy texnologiyalar bo`yicha interaktiv kurslar</p>
            <Link to="/courses" className="btn btn-secondary">
              Kurslarga o`tish <BsArrowRight className="ms-2" />
            </Link>
          </div>

          <div className="feature-card">
            <BsCollection className="feature-icon" />
            <h3>Kutubxona</h3>
            <p>Foydali kitoblar va o`quv materiallari</p>
            <Link to="/library" className="btn btn-secondary">
              Kutubxonaga kirish <BsArrowRight className="ms-2" />
            </Link>
          </div>

          <div className="feature-card ai-feature">
            <BsRobot className="feature-icon" />
            <h3>Sun`iy Intellekt Yordamchi</h3>
            <p>24/7 shaxsiy AI o`qituvchi bilan o`rganing</p>
            <ul className="ai-features-list">
              <li>✓ Savollaringizga tezkor javoblar</li>
              <li>✓ Mavzularni tushunishda yordam</li>
              <li>✓ Mashg`ulotlar bo`yicha maslahatlar</li>
            </ul>
            <Link to="/ai-assistant" className="btn btn-primary">
              AI bilan suhbatlashish <BsArrowRight className="ms-2" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
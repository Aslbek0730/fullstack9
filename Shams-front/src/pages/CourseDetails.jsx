import { useParams } from 'react-router-dom';
import './CourseDetails.css';

function CourseDetails() {
  const { id } = useParams();

  return (
    <div className="course-details">
      <h2>Kurs haqida ma'lumot</h2>
      <div className="course-info">
        <h3>Dasturlash asoslari</h3>
        <p className="description">
          Bu kursda Python dasturlash tilining asoslarini o'rganasiz.
        </p>
        <div className="details-grid">
          <div className="detail-item">
            <strong>Davomiyligi:</strong> 12 soat
          </div>
          <div className="detail-item">
            <strong>Daraja:</strong> Boshlang'ich
          </div>
          <div className="detail-item">
            <strong>Til:</strong> O'zbek
          </div>
        </div>
        <button className="btn btn-primary">Kursni boshlash</button>
      </div>
    </div>
  );
}

export default CourseDetails;
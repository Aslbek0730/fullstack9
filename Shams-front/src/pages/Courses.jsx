import './Courses.css';

function Courses() {
  return (
    <div className="courses">
      <h2>Kurslar</h2>
      <div className="filters">
        <select className="form-select">
          <option value="">Barcha kurslar</option>
          <option value="free">Bepul</option>
          <option value="paid">Pullik</option>
          <option value="discount">Chegirmali</option>
        </select>
        <input
          type="search"
          className="form-control"
          placeholder="Kurslarni qidirish..."
        />
      </div>
      <div className="courses-grid">
        {/* Placeholder for course cards */}
        <div className="course-card">
          <h3>Dasturlash asoslari</h3>
          <p>Python dasturlash tilini o'rganamiz</p>
          <button className="btn btn-primary">Batafsil</button>
        </div>
      </div>
    </div>
  );
}

export default Courses;
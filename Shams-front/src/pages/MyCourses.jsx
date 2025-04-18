import './MyCourses.css';

function MyCourses() {
  return (
    <div className="my-courses">
      <h2>Mening kurslarim</h2>
      <div className="courses-grid">
        <div className="course-card">
          <div className="course-progress">
            <div className="progress">
              <div 
                className="progress-bar" 
                role="progressbar" 
                style={{ width: '60%' }} 
                aria-valuenow="60" 
                aria-valuemin="0" 
                aria-valuemax="100"
              >
                60%
              </div>
            </div>
          </div>
          <h3>Python dasturlash asoslari</h3>
          <p>12 ta darsdan 7 tasi yakunlangan</p>
          <button className="btn btn-primary">Davom etish</button>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
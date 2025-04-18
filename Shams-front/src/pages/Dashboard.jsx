import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Mening kurslarim</h3>
          <p className="stat">3</p>
        </div>
        <div className="stat-card">
          <h3>Tugatilgan testlar</h3>
          <p className="stat">12</p>
        </div>
        <div className="stat-card">
          <h3>O'rtacha ball</h3>
          <p className="stat">85%</p>
        </div>
      </div>
      <div className="recent-activity">
        <h3>So'nggi faollik</h3>
        <div className="activity-list">
          <div className="activity-item">
            <p>Python kursi - 2-darsni tugatdingiz</p>
            <span>2 soat oldin</span>
          </div>
          <div className="activity-item">
            <p>Dasturlash testi - 90% to'g'ri javob</p>
            <span>Kecha</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
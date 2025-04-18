import './Tests.css';

function Tests() {
  return (
    <div className="tests">
      <h2>Testlar</h2>
      <div className="tests-grid">
        <div className="test-card">
          <h3>Python asoslari</h3>
          <p>10 ta savol • 15 daqiqa</p>
          <div className="test-info">
            <span>O'rtacha ball: 85%</span>
            <button className="btn btn-primary">Boshlash</button>
          </div>
        </div>
        <div className="test-card">
          <h3>Algoritmlash</h3>
          <p>15 ta savol • 20 daqiqa</p>
          <div className="test-info">
            <span>O'rtacha ball: 78%</span>
            <button className="btn btn-primary">Boshlash</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tests;
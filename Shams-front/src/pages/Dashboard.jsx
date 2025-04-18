import { BsBook, BsClock, BsStar } from 'react-icons/bs';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h1>Bosh sahifa</h1>
      </div>

      {/* Stats cards */}
      <div className="grid-container">
        <div className="content-card">
          <div className="d-flex align-items-center mb-3">
            <BsBook className="text-primary me-2" size={24} />
            <h3 className="mb-0">Faol kurslar</h3>
          </div>
          <p className="text-secondary mb-2">Jami kurslar soni</p>
          <h2 className="mb-0">5 ta</h2>
        </div>

        <div className="content-card">
          <div className="d-flex align-items-center mb-3">
            <BsClock className="text-primary me-2" size={24} />
            <h3 className="mb-0">Dars vaqti</h3>
          </div>
          <p className="text-secondary mb-2">Bugungi darslar</p>
          <h2 className="mb-0">2 soat</h2>
        </div>

        <div className="content-card">
          <div className="d-flex align-items-center mb-3">
            <BsStar className="text-primary me-2" size={24} />
            <h3 className="mb-0">Progress</h3>
          </div>
          <p className="text-secondary mb-2">Umumiy progress</p>
          <h2 className="mb-0">75%</h2>
        </div>
      </div>

      {/* Recent courses */}
      <div className="content-card">
        <h3 className="mb-4">Oxirgi kurslar</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Kurs nomi</th>
                <th>Progress</th>
                <th>Keyingi dars</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Python dasturlash</td>
                <td>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '60%' }}>60%</div>
                  </div>
                </td>
                <td>Funksiyalar</td>
                <td><span className="badge bg-success">Faol</span></td>
              </tr>
              <tr>
                <td>Web dasturlash</td>
                <td>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '30%' }}>30%</div>
                  </div>
                </td>
                <td>React.js</td>
                <td><span className="badge bg-success">Faol</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
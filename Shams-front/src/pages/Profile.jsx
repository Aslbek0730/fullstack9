import './Profile.css';

function Profile() {
  return (
    <div className="profile">
      <h2>Profil</h2>
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-image">
            <img src="https://via.placeholder.com/150" alt="Profile" />
            <button className="btn btn-secondary">Rasmni o'zgartirish</button>
          </div>
          <div className="profile-info">
            <h3>John Doe</h3>
            <p>john.doe@example.com</p>
          </div>
        </div>
        <form className="profile-form">
          <div className="form-group">
            <label>Ism</label>
            <input type="text" className="form-control" value="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" value="john.doe@example.com" />
          </div>
          <div className="form-group">
            <label>Yangi parol</label>
            <input type="password" className="form-control" />
          </div>
          <div className="form-group">
            <label>Parolni tasdiqlang</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Saqlash</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
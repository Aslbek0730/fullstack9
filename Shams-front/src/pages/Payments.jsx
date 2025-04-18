import React, { useState } from 'react';
import { FaCreditCard, FaHistory, FaBook, FaPlus, FaLock, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';
import './Payments.css';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    cardType: 'visa'
  });

  // Sample data for paid courses
  const paidCourses = [
    { id: 1, name: 'Python Dasturlash Asoslari', price: '299,000', date: '2024-01-15', status: 'paid' },
    { id: 2, name: 'Web Dasturlash', price: '399,000', date: '2024-02-01', status: 'paid' },
    { id: 3, name: 'Ma\'lumotlar Bazasi', price: '249,000', date: '2024-02-20', status: 'pending' }
  ];

  // Sample data for billing history
  const billingHistory = [
    { id: 1, course: 'Python Dasturlash Asoslari', amount: '299,000', date: '2024-01-15', status: 'completed' },
    { id: 2, course: 'Web Dasturlash', amount: '399,000', date: '2024-02-01', status: 'completed' },
    { id: 3, course: 'Ma\'lumotlar Bazasi', amount: '249,000', date: '2024-02-20', status: 'pending' }
  ];

  const handleCardFormChange = (e) => {
    const { name, value } = e.target;
    setCardForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the card
    console.log('Card form submitted:', cardForm);
  };

  return (
    <div className="payments-container">
      <div className="payments-header">
        <h2>To'lovlar</h2>
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <FaBook /> Kurslar
          </button>
          <button 
            className={`tab-btn ${activeTab === 'card' ? 'active' : ''}`}
            onClick={() => setActiveTab('card')}
          >
            <FaCreditCard /> Karta
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <FaHistory /> Tarix
          </button>
        </div>
      </div>

      {activeTab === 'courses' && (
        <div className="courses-section">
          <div className="courses-grid">
            {paidCourses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.name}</h3>
                <div className="course-details">
                  <span className="price">{course.price} so'm</span>
                  <span className={`status ${course.status}`}>
                    {course.status === 'paid' ? 'To\'langan' : 'Kutilmoqda'}
                  </span>
                </div>
                <div className="course-date">
                  <FaCalendarAlt /> {course.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'card' && (
        <div className="card-section">
          <form onSubmit={handleCardSubmit} className="card-form">
            <div className="form-group">
              <label>
                <FaCreditCard /> Karta raqami
              </label>
              <div className="card-input">
                <input
                  type="text"
                  name="cardNumber"
                  value={cardForm.cardNumber}
                  onChange={handleCardFormChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                <div className="card-icons">
                  <SiVisa className={cardForm.cardType === 'visa' ? 'active' : ''} />
                  <SiMastercard className={cardForm.cardType === 'mastercard' ? 'active' : ''} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>
                <FaUser /> Karta egasi
              </label>
              <input
                type="text"
                name="cardholderName"
                value={cardForm.cardholderName}
                onChange={handleCardFormChange}
                placeholder="Karta egasining ismi"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <FaCalendarAlt /> Amal qilish muddati
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardForm.expiryDate}
                  onChange={handleCardFormChange}
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaLock /> CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardForm.cvv}
                  onChange={handleCardFormChange}
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            <button type="submit" className="save-card-btn">
              <FaPlus /> Kartani saqlash
            </button>
          </form>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="history-section">
          <div className="table-container">
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Kurs</th>
                  <th>Summa</th>
                  <th>Sana</th>
                  <th>Holat</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map(record => (
                  <tr key={record.id}>
                    <td>{record.course}</td>
                    <td>{record.amount} so'm</td>
                    <td>{record.date}</td>
                    <td>
                      <span className={`status ${record.status}`}>
                        {record.status === 'completed' ? 'To\'langan' : 'Kutilmoqda'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments; 
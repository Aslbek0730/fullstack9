import React, { useState } from 'react';
import { FaCreditCard, FaUser, FaCalendar, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import './Payments.css';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  // Sample paid courses data
  const paidCourses = [
    {
      id: 1,
      name: 'Python asoslari',
      price: '299,000',
      purchaseDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Web dasturlash',
      price: '399,000',
      purchaseDate: '2024-02-01',
      status: 'active'
    },
    {
      id: 3,
      name: 'Ma\'lumotlar bazasi',
      price: '249,000',
      purchaseDate: '2024-02-20',
      status: 'expired'
    }
  ];

  // Sample billing history data
  const billingHistory = [
    {
      id: 1,
      date: '2024-02-20',
      description: 'Ma\'lumotlar bazasi kursi',
      amount: '249,000',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-02-01',
      description: 'Web dasturlash kursi',
      amount: '399,000',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-15',
      description: 'Python asoslari kursi',
      amount: '299,000',
      status: 'completed'
    }
  ];

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    // Handle card submission
    console.log('Card submitted:', cardForm);
  };

  return (
    <div className="payments-container">
      <h1>To`lovlar</h1>

      <div className="payments-tabs">
        <button
          className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Kurslar
        </button>
        <button
          className={`tab-btn ${activeTab === 'card' ? 'active' : ''}`}
          onClick={() => setActiveTab('card')}
        >
          Karta
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Tarix
        </button>
      </div>

      <div className="payments-content">
        {activeTab === 'courses' && (
          <div className="courses-list">
            {paidCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-info">
                  <h3>{course.name}</h3>
                  <p className="course-price">{course.price} so`m</p>
                  <p className="course-date">Sotib olingan: {course.purchaseDate}</p>
                </div>
                <div className={`course-status ${course.status}`}>
                  {course.status === 'active' ? 'Faol' : 'Muddati tugagan'}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'card' && (
          <div className="card-form-container">
            <form onSubmit={handleCardSubmit} className="card-form">
              <div className="form-group">
                <label>
                  <FaCreditCard />
                  Karta raqami
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardForm.cardNumber}
                  onChange={handleCardChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaUser />
                  Karta egasi
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={cardForm.cardHolder}
                  onChange={handleCardChange}
                  placeholder="Ism Familiya"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaCalendar />
                    Amal qilish muddati
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardForm.expiryDate}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaLock />
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardForm.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>

              <button type="submit" className="save-card-btn">
                Kartani saqlash
              </button>
            </form>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="billing-history">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Sana</th>
                    <th>Tavsif</th>
                    <th>Summa</th>
                    <th>Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map(transaction => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount} so`m</td>
                      <td>
                        <span className={`status-badge ${transaction.status}`}>
                          {transaction.status === 'completed' ? (
                            <>
                              <FaCheck /> To`langan
                            </>
                          ) : (
                            <>
                              <FaTimes /> Bekor qilingan
                            </>
                          )}
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
    </div>
  );
};

export default Payments; 
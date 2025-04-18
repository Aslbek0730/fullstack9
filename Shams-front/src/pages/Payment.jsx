import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCreditCard, FaTrash, FaLock } from 'react-icons/fa';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [showAddCard, setShowAddCard] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      number: '**** **** **** 4242',
      expiry: '12/25',
      type: 'Visa',
      isDefault: true
    }
  ]);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  const handleAddCard = () => {
    setShowAddCard(true);
    setErrors({});
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCard = () => {
    const newErrors = {};
    
    if (!newCard.number.trim()) {
      newErrors.number = 'Karta raqami kiritilishi shart';
    } else if (!/^\d{16}$/.test(newCard.number.replace(/\s/g, ''))) {
      newErrors.number = 'Noto\'g\'ri karta raqami';
    }
    
    if (!newCard.expiry.trim()) {
      newErrors.expiry = 'Muddati kiritilishi shart';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(newCard.expiry)) {
      newErrors.expiry = 'Noto\'g\'ri format (MM/YY)';
    }
    
    if (!newCard.cvv.trim()) {
      newErrors.cvv = 'CVV kiritilishi shart';
    } else if (!/^\d{3,4}$/.test(newCard.cvv)) {
      newErrors.cvv = 'Noto\'g\'ri CVV';
    }
    
    if (!newCard.name.trim()) {
      newErrors.name = 'Ism kiritilishi shart';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    if (!validateCard()) return;

    // Here you would typically make an API call to save the card
    const card = {
      id: Date.now(),
      number: `**** **** **** ${newCard.number.slice(-4)}`,
      expiry: newCard.expiry,
      type: newCard.number.startsWith('4') ? 'Visa' : 'Mastercard',
      isDefault: cards.length === 0
    };

    setCards(prev => [...prev, card]);
    setShowAddCard(false);
    setNewCard({
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    });
  };

  const handleSetDefault = (cardId) => {
    setCards(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const handleDeleteCard = (cardId) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>To'lov usullari</h1>
        <button className="add-card-button" onClick={handleAddCard}>
          <FaPlus /> Karta qo'shish
        </button>
      </div>

      <div className="cards-list">
        {cards.map(card => (
          <div key={card.id} className="card-item">
            <div className="card-info">
              <FaCreditCard className="card-icon" />
              <div>
                <h3>{card.number}</h3>
                <p>Muddati: {card.expiry}</p>
                <span className="card-type">{card.type}</span>
              </div>
            </div>
            <div className="card-actions">
              {card.isDefault ? (
                <span className="default-badge">Asosiy</span>
              ) : (
                <button 
                  className="set-default-button"
                  onClick={() => handleSetDefault(card.id)}
                >
                  Asosiy qilish
                </button>
              )}
              <button 
                className="delete-button"
                onClick={() => handleDeleteCard(card.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddCard && (
        <div className="add-card-form">
          <h2>Yangi karta qo'shish</h2>
          <form onSubmit={handleSubmitCard}>
            <div className="form-group">
              <label>Karta raqami</label>
              <input
                type="text"
                name="number"
                value={newCard.number}
                onChange={handleCardInputChange}
                placeholder="1234 5678 9012 3456"
                className={errors.number ? 'error' : ''}
              />
              {errors.number && <span className="error-text">{errors.number}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Muddati</label>
                <input
                  type="text"
                  name="expiry"
                  value={newCard.expiry}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  className={errors.expiry ? 'error' : ''}
                />
                {errors.expiry && <span className="error-text">{errors.expiry}</span>}
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={newCard.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  className={errors.cvv ? 'error' : ''}
                />
                {errors.cvv && <span className="error-text">{errors.cvv}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Karta egasi</label>
              <input
                type="text"
                name="name"
                value={newCard.name}
                onChange={handleCardInputChange}
                placeholder="Ism Familiya"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowAddCard(false)}
              >
                Bekor qilish
              </button>
              <button type="submit" className="submit-button">
                Saqlash
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="security-notice">
        <FaLock />
        <p>Barcha ma'lumotlar xavfsiz saqlanadi va shifrlanadi</p>
      </div>

      <button className="checkout-button" onClick={handleCheckout}>
        To'lov qilish
      </button>
    </div>
  );
};

export default Payment; 
import React, { useState } from 'react';
import { FaDownload, FaShoppingCart } from 'react-icons/fa';
import './Library.css';

const Library = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API data
  const books = [
    {
      id: 1,
      title: 'Python Dasturlash Asoslari',
      author: 'John Doe',
      cover: '/images/books/python.jpg',
      price: 0,
      category: 'free',
      description: 'Python dasturlash tilini o\'rganish uchun boshlang\'ich qo\'llanma',
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      author: 'Jane Smith',
      cover: '/images/books/js.jpg',
      price: 29.99,
      category: 'premium',
      description: 'Zamonaviy JavaScript texnologiyalari va amaliyotlari',
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      author: 'Mike Johnson',
      cover: '/images/books/datascience.jpg',
      price: 19.99,
      category: 'discount',
      description: 'Ma\'lumotlar tahlili va vizualizatsiya asoslari',
    },
    // Add more books...
  ];

  const tabs = [
    { id: 'all', name: 'Barchasi' },
    { id: 'free', name: 'Bepul' },
    { id: 'premium', name: 'Pullik' },
    { id: 'discount', name: 'Chegirma' },
  ];

  const filteredBooks = books.filter(book => {
    const matchesTab = activeTab === 'all' || book.category === activeTab;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="library-page">
      <div className="library-header">
        <h1>Kutubxona</h1>
        <div className="search-bar">
          {/* <input
            type="text"
            placeholder="Kitoblarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
        </div>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-cover">
              <img src={book.cover} alt={book.title} />
              {book.category === 'discount' && (
                <div className="discount-badge">Chegirma</div>
              )}
            </div>
            <div className="book-content">
              <h3>{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <p className="book-description">{book.description}</p>
              <div className="book-footer">
                {book.price > 0 ? (
                  <>
                    <span className="book-price">${book.price}</span>
                    <button className="btn btn-gradient">
                      <FaShoppingCart className="btn-icon" />
                      Sotib olish
                    </button>
                  </>
                ) : (
                  <button className="btn btn-outline">
                    <FaDownload className="btn-icon" />
                    Yuklab olish
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
import './Library.css';

function Library() {
  return (
    <div className="library">
      <h2>Kutubxona</h2>
      <div className="filters">
        <select className="form-select">
          <option value="">Barcha kitoblar</option>
          <option value="free">Bepul</option>
          <option value="paid">Pullik</option>
        </select>
        <input
          type="search"
          className="form-control"
          placeholder="Kitoblarni qidirish..."
        />
      </div>
      <div className="books-grid">
        {/* Placeholder for book cards */}
        <div className="book-card">
          <h3>Dasturlash asoslari</h3>
          <p>Python dasturlash tili bo'yicha qo'llanma</p>
          <button className="btn btn-primary">Ko'rish</button>
        </div>
      </div>
    </div>
  );
}

export default Library;
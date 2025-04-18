import './Forum.css';

function Forum() {
  return (
    <div className="forum">
      <h2>Forum</h2>
      <div className="forum-header">
        <select className="form-select">
          <option value="">Barcha mavzular</option>
          <option value="programming">Dasturlash</option>
          <option value="creativity">Ijodkorlik</option>
          <option value="innovation">Ixtirochilik</option>
        </select>
        <button className="btn btn-primary">Yangi mavzu</button>
      </div>
      <div className="forum-posts">
        <div className="forum-post">
          <h3>Python da massivlar bilan ishlash</h3>
          <div className="post-meta">
            <span>John Doe</span>
            <span>2 soat oldin</span>
          </div>
          <p>Massivlar bilan ishlashda qanday usullar bor?</p>
          <div className="post-stats">
            <span>5 javob</span>
            <span>12 like</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forum;
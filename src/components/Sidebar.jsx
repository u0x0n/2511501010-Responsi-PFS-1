// Sidebar navigasi di sisi kiri dashboard
function Sidebar() {
  return (
    <aside className="sidebar p-3" id="sidebar">
      <h5 className="mb-4">🛒 TokoAdmin</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link rounded" href="#">
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link rounded active" href="#">
            Produk
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

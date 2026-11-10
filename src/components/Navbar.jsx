// Navbar atas, berisi tombol toggle sidebar (untuk mobile)
function Navbar() {
  return (
    <nav className="navbar bg-white shadow-sm px-3">
      <button className="btn btn-outline-secondary d-md-none" id="sidebarToggle">
        ☰
      </button>
      <span className="navbar-brand mb-0 h1">Manajemen Produk</span>
    </nav>
  )
}

export default Navbar
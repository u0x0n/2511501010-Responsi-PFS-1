import { useState, useEffect } from "react";
import $ from "jquery";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProductTable from "./components/ProductTable";
import FormModal from "./components/FormModal";
import { initialProducts } from "./data/products";
import "./App.css";

function App() {
  // State utama: daftar produk
  const [products, setProducts] = useState(initialProducts);
  // State modal: tampil/tidak, dan produk yang sedang diedit (null = mode tambah)
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  // State pencarian dan filter kategori
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");

  // jQuery: dijalankan sekali saat halaman dimuat, di luar kendali state React
  useEffect(() => {
    // Efek fade-in pada konten saat halaman dibuka
    $(".main-content").hide().fadeIn(800);
    // Tombol ☰ membuka/menutup sidebar di layar kecil
    $("#sidebarToggle").on("click", () => {
      $("#sidebar").toggleClass("open");
    });
    // Bersihkan event saat komponen dilepas
    return () => {
      $("#sidebarToggle").off("click");
    };
  }, []);

  // Buka modal mode tambah
  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  // Buka modal mode edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // CREATE & UPDATE: simpan data dari form
  const handleSave = (data) => {
    if (data.id) {
      // Update: ganti produk dengan id yang sama
      setProducts(products.map((p) => (p.id === data.id ? data : p)));
    } else {
      // Create: tambahkan produk baru dengan id unik
      setProducts([...products, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
  };

  // DELETE: hapus produk setelah konfirmasi
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Terapkan pencarian nama + filter kategori
  const filteredProducts = products.filter((p) => {
    const cocokNama = p.nama.toLowerCase().includes(search.toLowerCase());
    const cocokKategori = kategori === "Semua" || p.kategori === kategori;
    return cocokNama && cocokKategori;
  });

  // Hitung angka untuk kartu ringkasan
  const totalProduk = products.length;
  const stokMenipis = products.filter((p) => p.stok > 0 && p.stok <= 10).length;
  const stokHabis = products.filter((p) => p.stok === 0).length;

  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="container-fluid p-3 p-md-4">
          {/* Kartu ringkasan */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 summary-card">
                <div className="card-body">
                  <div className="text-muted small">Total Produk</div>
                  <div className="fs-2 fw-bold">{totalProduk}</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="card shadow-sm border-0 summary-card">
                <div className="card-body">
                  <div className="text-muted small">Stok Menipis</div>
                  <div className="fs-2 fw-bold text-warning">{stokMenipis}</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="card shadow-sm border-0 summary-card">
                <div className="card-body">
                  <div className="text-muted small">Stok Habis</div>
                  <div className="fs-2 fw-bold text-danger">{stokHabis}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Judul, pencarian, filter, tombol tambah */}
          <div className="row g-2 align-items-center mb-3">
            <div className="col-12 col-md">
              <h4 className="mb-0">Daftar Produk</h4>
            </div>
            <div className="col-12 col-md-3">
              <input
                className="form-control"
                placeholder="Cari nama produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-6 col-md-2">
              <select
                className="form-select"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option>Semua</option>
                <option>Fashion</option>
                <option>Elektronik</option>
                <option>Rumah Tangga</option>
                <option>Makanan</option>
              </select>
            </div>
            <div className="col-6 col-md-auto">
              <button className="btn btn-primary w-100" onClick={handleAdd}>
                + Tambah Produk
              </button>
            </div>
          </div>

          <ProductTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      <FormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        product={editingProduct}
      />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";

// Form kosong sebagai nilai awal
const emptyForm = {
  nama: "",
  kategori: "Fashion",
  harga: "",
  diskon: 0,
  stok: "",
};

// Modal form untuk tambah & edit produk
function FormModal({ show, onClose, onSave, product }) {
  const [form, setForm] = useState(emptyForm);

  // Setiap modal dibuka: isi form dengan data produk (edit) atau kosong (tambah)
  useEffect(() => {
    setForm(product ? product : emptyForm);
  }, [product, show]);

  if (!show) return null;

  // Update satu field form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Kirim data ke App (angka dikonversi dari string)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      harga: Number(form.harga),
      diskon: Number(form.diskon),
      stok: Number(form.stok),
    });
  };

  return (
    <>
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {product ? "Edit Produk" : "Tambah Produk"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nama Produk</label>
                <input
                  className="form-control"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Kategori</label>
                <select
                  className="form-select"
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                >
                  <option>Fashion</option>
                  <option>Elektronik</option>
                  <option>Rumah Tangga</option>
                  <option>Makanan</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Harga (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="harga"
                    value={form.harga}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Diskon (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="form-control"
                    name="diskon"
                    value={form.diskon}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Stok</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="stok"
                    value={form.stok}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Latar gelap di belakang modal */}
      <div className="modal-backdrop show"></div>
    </>
  );
}

export default FormModal;

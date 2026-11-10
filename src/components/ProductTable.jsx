// Fungsi bantu: format angka ke Rupiah
const formatRupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);

// Fungsi bantu: tentukan status stok dengan if/else
function getStatusStok(stok) {
  if (stok === 0) return { label: "Habis", warna: "danger" };
  else if (stok <= 10) return { label: "Menipis", warna: "warning" };
  else return { label: "Aman", warna: "success" };
}

// Tabel daftar produk (menerima aksi edit & hapus dari App)
function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Diskon</th>
              <th>Stok</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => {
              const status = getStatusStok(p.stok);
              return (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.nama}</td>
                  <td>{p.kategori}</td>
                  <td>{formatRupiah(p.harga)}</td>
                  <td>{p.diskon}%</td>
                  <td>{p.stok}</td>
                  <td>
                    <span className={`badge text-bg-${status.warna}`}>
                      {status.label}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(p.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;

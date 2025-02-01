import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../const";

function Allkomplain() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAduan, setSelectedAduan] = useState(null);
  const [tanggapan, setTanggapan] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function NotifSukses() {
    Swal.fire({
      title: "Komplain Selesai!",
      icon: "success",
      draggable: true,
    });
  }

  function NotifGagal() {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: "Gagal mengubah status komplain!",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/admin/list-pengaduan/menunggu-tanggapan`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        setData(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleTanggapanSubmit = async () => {
    if (!selectedAduan) return;

    const token = localStorage.getItem("token");
    try {
      await axios.post(`${API_URL}/admin/tanggapi-pengaduan`, {
        id_pengaduan: selectedAduan.id_pengaduan,
        tanggapan,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setShowModal(false);
      setTanggapan("");
      NotifSukses();

      setData(prevData => prevData.map(item =>
        item.id_pengaduan === selectedAduan.id_pengaduan ? { ...item, status: "Diproses", tanggapan } : item
      ));
    } catch (error) {
      console.log(error);
      NotifGagal();
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="hero">
          <h2>Komplain</h2>
          <div className="container">
            <table border="1px">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Deskripsi</th>
                  <th>Lokasi</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">Loading...</td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id_pengaduan}>
                      <td>{item.nama_user}</td>
                      <td>{item.deskripsi_aduan}</td>
                      <td>{item.lokasi_aduan}</td>
                      <td>{new Date(item.tanggal_aduan).toLocaleDateString("id-ID")}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedAduan(item);
                            setShowModal(true);
                          }}
                        >
                          Proses
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Tidak ada data tersedia</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Tanggapi Komplain</h3>
            <p>{selectedAduan?.deskripsi_aduan}</p>
            <textarea
              value={tanggapan}
              onChange={(e) => setTanggapan(e.target.value)}
              placeholder="Masukkan tanggapan"
            ></textarea>
            <button onClick={handleTanggapanSubmit}>Kirim</button>
            <button onClick={() => setShowModal(false)}>Batal</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Allkomplain;

import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../const";

function Allkomplain() {
  const [data, setData] = useState([]); // Pastikan default adalah array
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Perbaikan: Gunakan navigate sebagai fungsi

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
        navigate("/"); // Perbaikan: Gunakan navigate
        return;
      }
      try {
        const response = await axios.get(
          `${API_URL}/admin/list-pengaduan/menunggu-tanggapan`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setData(response.data.data || []); // Pastikan data selalu array
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();

    AOS.init({
      once: true,
    });
  }, [navigate]);

  const prosesKomplain = async (id_pengaduan) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_URL}/admin/tanggapi-pengaduan`,
        {
          tanggapan: "Komplain telah selesai",
          id_pengaduan: id_pengaduan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      );
      NotifSukses();

      // Perbaikan: Pastikan setData mengembalikan array baru yang diperbarui
      setData((prevData) =>
        prevData.map((item) =>
          item.id_pengaduan === id_pengaduan ? { ...item, status: "Diproses" } : item
        )
      );
    } catch (error) {
      console.log(error);
      NotifGagal();
    }
  };

  // Format waktu
  function FormatWaktu({ waktu }) {
    const formatWaktu = new Date(waktu).toLocaleDateString("id-ID");
    return <span>{formatWaktu}</span>;
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="hero">
          <h2>Komplain</h2>
          <div
            className="container"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <table border="1px">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Deskripsi</th>
                  <th>Lokasi</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Tanggapan</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">Loading...</td>
                  </tr>
                ) : data.length > 0 ? ( // Pastikan data tidak kosong sebelum map
                  data.map((item) => (
                    <tr key={item.id_pengaduan}>
                      <td>{item.nama_user}</td>
                      <td>{item.deskripsi_aduan}</td>
                      <td>{item.lokasi_aduan}</td>
                      <td>
                        <FormatWaktu waktu={item.tanggal_aduan} />
                      </td>
                      <td>{item.status}</td>
                      <td>
                        <button onClick={() => prosesKomplain(item.id_pengaduan)}>
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
    </div>
  );
}

export default Allkomplain;

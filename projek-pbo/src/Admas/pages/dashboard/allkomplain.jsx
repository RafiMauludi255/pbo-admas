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
  const [data, setData] = useState([]);

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
      text: "Gagal menghapus data!",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        useNavigate("/");
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
        setData(response.data.data);
        // console.log(response.data,'ini data');
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    AOS.init({
      once: true,
    });
  }, []);

  const deleteData = async (nama) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/clearkomplain/${nama}`
      );
      NotifSukses();
      setData(data.filter((item) => item.nama !== nama));
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
                  {/* <th>Tanggal Ditanggapi</th> */}
                  {/* <th>Tanggapan Selesai</th> */}
                  {/* <th>Tanggal Selesai</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id_pengaduan}>
                    <td>{item.nama_user}</td>
                    <td>{item.deskripsi_aduan}</td>
                    <td>{item.lokasi_aduan}</td>
                    <td>
                      <FormatWaktu waktu={item.tanggal_aduan} />
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <button onClick={() => deleteData(item.nama)}>
                        Selesai
                      </button>
                    </td>
                    {/* <td>
                      <FormatWaktu waktu={item.tanggal_ditanggapi} />
                    </td> */}
                    {/* <td>{item.tanggapan_selesai}</td> */}
                    {/* <td>{item.tanggal_selesai}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Allkomplain;

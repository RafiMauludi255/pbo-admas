import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";
import { API_URL } from "../../const";

export default function Alluser() {
  const [user, setUser] = useState([]);
  const [selectedAduan, setSelectedAduan] = useState(null);
  const [tanggapan, setTanggapan] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/admin/list-pengaduan/diproses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleTanggapanSubmit = async () => {
    if (!selectedAduan) return;

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://daee-2001-448a-2020-7773-887e-cd7d-a7c7-46b2.ngrok-free.app/api/admin/selesaikan-pengaduan",
        {
          id_pengaduan: selectedAduan.id_pengaduan,
          tanggapan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShowModal(false);
      setTanggapan("");
      setUser(
        user.filter(
          (aduan) => aduan.id_pengaduan !== selectedAduan.id_pengaduan
        )
      );
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="hero">
          <h2>Daftar Pengaduan</h2>
          <div className="container">
            <table border="1px">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Deskripsi Aduan</th>
                  <th>Lokasi</th>
                  <th>Tanggal Aduan</th>
                  <th>Status</th>
                  <th>Tanggapan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {user.length > 0 ? (
                  user.map((aduan) => (
                    <tr key={aduan.id_pengaduan}>
                      <td>{aduan.nama_user}</td>
                      <td>{aduan.deskripsi_aduan}</td>
                      <td>{aduan.lokasi_aduan}</td>
                      <td>
                        {new Date(aduan.tanggal_aduan).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                      <td>{aduan.status}</td>
                      <td>{aduan.tanggapan || "Belum ditanggapi"}</td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedAduan(aduan);
                            setShowModal(true);
                          }}
                        >
                          Tanggapi
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Tidak ada data</td>
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
            <h3>Tanggapi Pengaduan</h3>
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

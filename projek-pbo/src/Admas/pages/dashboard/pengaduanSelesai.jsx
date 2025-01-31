import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";

export default function Alluser() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get("https://daee-2001-448a-2020-7773-887e-cd7d-a7c7-46b2.ngrok-free.app/api/admin/list-pengaduan/selesai", {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        console.log("Response dari API:", response.data);
        setUser(response.data.data); // Pastikan mengambil array data
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log("Detail error:", error.response.data);
        }
      }
    };
    fetchUser();
  }, [navigate]);

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
                  <th>Tanggal Ditanggapi</th>
                  <th>Tanggal Selesai</th>
                  <th>Status</th>
                  <th>Tanggapan</th>
                </tr>
              </thead>
              <tbody>
                {user.length > 0 ? (
                  user.map((aduan) => (
                    <tr key={aduan.id_pengaduan}>
                      <td>{aduan.nama_user}</td>
                      <td>{aduan.deskripsi_aduan}</td>
                      <td>{aduan.lokasi_aduan}</td>
                      <td>{new Date(aduan.tanggal_aduan).toLocaleDateString("id-ID")}</td>
                      <td>{new Date(aduan.tanggal_ditanggapi).toLocaleDateString("id-ID")}</td>
                      <td>{new Date(aduan.tanggal_selesai).toLocaleDateString("id-ID")}</td>
                      <td>{aduan.status}</td>
                      <td>{aduan.tanggapan_selesai}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Tidak ada data</td>
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

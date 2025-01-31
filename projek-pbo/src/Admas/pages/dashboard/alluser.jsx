import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";
import { API_URL } from "../../const";

export default function Alluser() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }

      try {
        const response = await axios.get(`${API_URL}/admin/profile-admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.response) {
          console.log("Detail error:", error.response.data);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="hero">
          <h2>User Admin</h2>
          <div className="container">
            <table border="1px">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Provinsi</th>
                  <th>Kota</th>
                  <th>Aduan Ditanggapi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">Loading ...</td>
                  </tr>
                ) : (
                  user && (
                    <tr>
                      <td>{user.nama}</td>
                      <td>{user.email}</td>
                      <td>{user.provinsi}</td>
                      <td>{user.kota}</td>
                      <td>{user.aduan_ditanggapi}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

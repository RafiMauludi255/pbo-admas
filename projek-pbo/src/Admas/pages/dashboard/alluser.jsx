import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";

export default function Alluser() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }

      try {
        const response = await axios.get("https://daee-2001-448a-2020-7773-887e-cd7d-a7c7-46b2.ngrok-free.app/api/admin/profile-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        console.log("Response dari API:", response.data); 
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
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
                {user && (
                  <tr>
                    <td>{user.nama}</td>
                    <td>{user.email}</td>
                    <td>{user.provinsi}</td>
                    <td>{user.kota}</td>
                    <td>{user.aduan_ditanggapi}</td>
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

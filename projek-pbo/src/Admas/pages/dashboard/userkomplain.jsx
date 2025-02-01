import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";
import { API_URL } from "../../const";

export default function UserKomplain() {
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
        const response = await axios.get(`${API_URL}/admin/get-user`, {
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
          <h2>User Komplain</h2>
          <div className="container">
            <table border="1px">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Nik</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">Loading ...</td>
                  </tr>
                ) : (
                  user.map((item) => (
                    <tr>
                      <td>{item.nama_user}</td>
                      <td>{item.nik}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

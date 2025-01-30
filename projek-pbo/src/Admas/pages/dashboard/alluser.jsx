import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";

export default function Alluser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        useNavigate("/");
      }

      try {
        const response = await axios.get("http://localhost:8001/useradmin", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/deleteadmin/${id}`
      );
      // setData("Berhasil menghapus data!");
      alert("berhasil menghapus data!");
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus data!");
    }
  };
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="hero">
          <h2>User Admin</h2>
          <div
            className="container"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <table border="1px">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item) => (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                      <button onClick={() => deleteData(item.id)}>Hapus</button>
                    </td>
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

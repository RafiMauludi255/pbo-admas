import React, { useEffect, useState } from "react";
import "../style/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import Home from "../assets/home.png";
import Complain from "../assets/complain.png";
import User from "../assets/user.png";
import Verify from "../assets/verify.png";
import Admin from "../assets/male.png";
import Logout from "../assets/logout.png";
import axios from "axios";
import { API_URL } from "../const";

function Sidebar() {
  const [account, setAccount] = useState(() => {
    const savedAccount = localStorage.getItem("account");
    return savedAccount ? JSON.parse(savedAccount) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) return;
  
        const response = await axios.get(
          `${API_URL}/admin/profile-admin?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setAccount(response.data.data);
        localStorage.setItem("account", JSON.stringify(response.data.data));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account"); // Hapus data akun dari localStorage
    useNavigate("/");
  };

  return (
    <div className="sidebar">
      <div className="account">
        <img src={Admin} alt="admin" />
        {account ? (
          <p>
            {account.nama}
            <br />
            <span>{account.email}</span>
          </p>
        ) : (
          "Loading"
        )}
      </div>
      <ul>
        <Link to="/pages/dashboard">
          <li>
            <img src={Home} alt="home" />
            Home
          </li>
        </Link>

        <Link to="/pages/dashboard/allkomplain">
          <li>
            <img src={Complain} alt="complain" />
            Lihat Komplain
          </li>
        </Link>
        <Link to="/pages/dashboard/alluser">
          <li>
            <img src={User} alt="complain" />
            Lihat User
          </li>
        </Link>
        <Link to="/pages/dashboard/pengaduanProses">
          <li>
            <img src={User} alt="complain" />
            Pengaduan (Proses)
          </li>
        </Link>
        <Link to="/pages/dashboard/pengaduanSelesai">
          <li>
            <img src={User} alt="complain" />
            Pengaduan (Selesai)
          </li>
        </Link>
        <Link to="/">
          <li onClick={handleLogout}>
            <img src={Logout} alt="logout" />
            Keluar
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
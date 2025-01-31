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

function Sidebar() {
  const [account, setAccount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          `https://daee-2001-448a-2020-7773-887e-cd7d-a7c7-46b2.ngrok-free.app/api/admin/profile-admin?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setAccount(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
        <Link to="/pages/dashboard/register">
          <li>
            <img src={Verify} alt="complain" />
            Register
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

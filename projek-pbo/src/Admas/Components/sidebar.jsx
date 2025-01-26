import React, { useEffect, useState } from "react";
import "../style/sidebar.css";
import { Link } from "react-router-dom";
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
          `http://localhost:8001/current-user?email=${email}`
        );
        setAccount(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
        <Link to="/pages/dashboard/register">
          <li>
            <img src={Verify} alt="complain" />
            Register
          </li>
        </Link>
        <Link to="/">
          <li>
            <img src={Logout} alt="logout" />
            Keluar
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;

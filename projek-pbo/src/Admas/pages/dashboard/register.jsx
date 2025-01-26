import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../../style/register.css";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";

export default function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = Navigate;

  // Format
  const data = {
    nama,
    email,
    password,
  };

  const handleRegister = async () => {
    // e.preventDefault();
    try {
      const regist = await axios.post("http://localhost:8001/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Berhasil membuat akun!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <Sidebar />
      <form onSubmit={handleRegister}>
        <div className="body">
          <div className="hero">
            <h2>Register</h2>
            <div
              className="container"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <div className="box">
                <h2>Register</h2>
                <div className="inputRegister">
                  <p>Nama</p>
                  <input
                    type="text"
                    placeholder="Nama Pengguna"
                    required
                    name={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder="your email active"
                    required
                    name={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p>Password</p>
                  <input
                    type="password"
                    placeholder="create new password"
                    required
                    name={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button>Register</button>
                  {message && <p>{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

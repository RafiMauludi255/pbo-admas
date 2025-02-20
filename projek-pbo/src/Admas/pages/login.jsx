import LoginIcon from "../assets/login.svg";
import "../style/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../const";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // format
    const data = { email, password };

    try {
      const response = await axios.post(`${API_URL}/admin/login-admin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.data.access_token) {
        localStorage.setItem("token", response.data.data.access_token);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("account", JSON.stringify(response.data.data)); // Simpan data akun
        setMessage("Berhasil Login!");
        setTimeout(() => {
          navigate("/pages/dashboard");
        }, 1000);
      } else {
        setMessage("Gagal Login! Kesalahan Server");
      }
    } catch (error) {
      setMessage("Gagal Login! periksa email atau password!");
    }
  };

  return (
    <div className="loginForm">
      <div className="imgLogin">
        <img src={LoginIcon} alt="Login" />
      </div>
      <div className="inputForm">
        <form onSubmit={handleLogin}>
          <h1>Admas Dashboard</h1>
          <p>Selamat datang di web dashboard Aduan Masyarakat.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <br /> */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <button>Login</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

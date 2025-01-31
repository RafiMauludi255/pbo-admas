import Navbar from "../Components/navbar";
import Sidebar from "../Components/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../const";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, [navigate]);

  useEffect(() => {
    // const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/aduan/chart-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        const rawData = response.data.data;
        setData(response.data.data);
        setChartData({
          labels: ["Selesai", "Proses", "Menunggu Tanggapan"], // Sorted Dates
          datasets: [
            {
              label: "Jumlah Aduan",
              data: [
                rawData.selesai,
                rawData.proses,
                rawData.menunggu_tanggapan,
              ], // Sorted Counts
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="hero">
          <h2 style={{ paddingBottom: "50px" }}>Dashboard</h2>

          {/* Complaints Chart */}
          <div
            className="chart-container"
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <h3 style={{ paddingBottom: "20px" }}>
              Statistik Komplain Per Tanggal
            </h3>

            {chartData.labels ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
              />
            ) : (
              <p>Loading chart...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

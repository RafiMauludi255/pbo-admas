import Navbar from "../Components/navbar";
import Sidebar from "../Components/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/allkomplain", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setData(response.data);
  
        // Group complaints by date
        const groupedData = response.data.reduce((acc, item) => {
          const date = item.create_date.split("T")[0]; // Extract YYYY-MM-DD
          const [year, month, day] = date.split("-"); // Split into [year, month, day]
          const formattedDate = `${day}-${month}-${year}`; // Convert to DD-MM-YYYY
          acc[formattedDate] = (acc[formattedDate] || 0) + 1;
          return acc;
        }, {});
  
        // Sort the dates in ascending order
        const sortedLabels = Object.keys(groupedData).sort((a, b) => {
          const [dayA, monthA, yearA] = a.split("-").map(num => parseInt(num, 10));
          const [dayB, monthB, yearB] = b.split("-").map(num => parseInt(num, 10));
          return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
        });
  
        const sortedData = sortedLabels.map(date => groupedData[date]);
  
        // Prepare data for the chart
        setChartData({
          labels: sortedLabels, // Sorted Dates
          datasets: [
            {
              label: "Complaints Per Date",
              data: sortedData, // Sorted Counts
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
            <h3 style={{ paddingBottom: "20px" }}>Statistik Komplain Per Tanggal</h3>

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

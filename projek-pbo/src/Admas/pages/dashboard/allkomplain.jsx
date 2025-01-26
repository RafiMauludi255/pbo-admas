import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "../../style/allkomplain.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
<<<<<<< HEAD
import Swal from "sweetalert2";
=======
>>>>>>> 4e5baa7572e65b86b9f4189cb824ea2dcf3f30f2

function Allkomplain() {
  const [data, setData] = useState([]);

  function NotifSukses() {
    Swal.fire({
      title: "Komplain Selesai!",
      icon: "success",
      draggable: true,
    });
  }

  function NotifGagal() {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: "Gagal menghapus data!",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/allkomplain");
        setData(response.data);
        console.log(response.data,'ini data');
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    AOS.init({
<<<<<<< HEAD
      once: true,
=======
      once: true, // Ensures animations occur only once
>>>>>>> 4e5baa7572e65b86b9f4189cb824ea2dcf3f30f2
    });
  }, []);

  const deleteData = async (nama) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/clearkomplain/${nama}`
      );
      NotifSukses();
      setData(data.filter((item) => item.nama !== nama));
    } catch (error) {
      console.log(error);
      NotifGagal();
    }
  };

  // Format waktu
  function FormatWaktu({ waktu }) {
    const formatWaktu = new Date(waktu).toLocaleDateString("id-ID");
    return <span>{formatWaktu}</span>;
  }
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="hero">
          <h2>Komplain</h2>
          <div
            className="container"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <table border="1px">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Usia</th>
                  <th>Provinsi</th>
                  <th>Kota</th>
                  <th>Desa</th>
                  <th>Profesi</th>
                  <th>Komplain</th>
                  <th>Waktu</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.nama}>
                    <td>{item.nama}</td>
                    <td>{item.usia}</td>
                    <td>{item.provinsi}</td>
                    <td>{item.kota}</td>
                    <td>{item.desa}</td>
                    <td>{item.profesi}</td>
                    <td>{item.komplain}</td>
                    <td>
                      <FormatWaktu waktu={item.create_date} />
                    </td>
                    <td>
                      <button onClick={() => deleteData(item.nama)}>
                        Selesai
                      </button>
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

export default Allkomplain;

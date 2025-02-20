import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Allkomplain from "./pages/dashboard/allkomplain";
import Alluser from "./pages/dashboard/alluser";
import PengaduanProses from "./pages/dashboard/pengaduanProses";
import PengaduanSelesai from "./pages/dashboard/pengaduanSelesai";
import UserKomplain from "./pages/dashboard/userkomplain";

export default function Index() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/pages/dashboard" element={<Dashboard />} />
        <Route path="/pages/dashboard/allkomplain" element={<Allkomplain />} />
        <Route path="/pages/dashboard/alluser" element={<Alluser />} />
        <Route path="/pages/dashboard/userkomplain" element={<UserKomplain />} />
        <Route path="/pages/dashboard/pengaduanProses" element={<PengaduanProses />} />
        <Route path="/pages/dashboard/pengaduanSelesai" element={<PengaduanSelesai />} />
      </Routes>
    </BrowserRouter>
  );
}

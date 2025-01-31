import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Allkomplain from "./pages/dashboard/allkomplain";
import Register from "./pages/dashboard/register";
import Alluser from "./pages/dashboard/alluser";
import PengaduanProses from "./pages/dashboard/pengaduanProses";

export default function Index() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/pages/dashboard" element={<Dashboard />} />
        <Route path="/pages/dashboard/allkomplain" element={<Allkomplain />} />
        <Route path="/pages/dashboard/register" element={<Register />} />
        <Route path="/pages/dashboard/alluser" element={<Alluser />} />
        <Route path="/pages/dashboard/pengaduanProses" element={<PengaduanProses />} />
      </Routes>
    </BrowserRouter>
  );
}

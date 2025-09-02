import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import TechnicianLogin from "./pages/TechnicianLogin";
import DentistLogin from "./pages/DentistLogin";
import UploadScan from "./pages/UploadScan";
import ViewScans from "./pages/ViewScans";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technician-login" element={<TechnicianLogin />} />
        <Route path="/dentist-login" element={<DentistLogin />} />
        <Route path="/upload-scan" element={<UploadScan />} />
        <Route path="/view-scans" element={<ViewScans />} />
      </Routes>
    </div>
  );
};

export default App;

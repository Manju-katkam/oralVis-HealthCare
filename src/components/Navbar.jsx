import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-gray-300">
      <h1 className="text-xl font-bold text-blue-600">OralVisHealthCare</h1>

      <ul className="flex gap-6">
        <NavLink to="/">Home</NavLink>

        {!role && (
          <>
            <NavLink to="/technician-login">Technician Login</NavLink>
            <NavLink to="/dentist-login">Dentist Login</NavLink>
          </>
        )}

        {role === "technician" && (
          <NavLink to="/upload-scan">Upload Scans</NavLink>
        )}

        {role === "dentist" && (
          <NavLink to="/view-scans">View Scans</NavLink>
        )}
      </ul>

      {role && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;

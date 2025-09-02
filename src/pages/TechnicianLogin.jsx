import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TechnicianLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple check (replace with real auth later)
    if (email && password) {
      localStorage.setItem("role", "technician");
      navigate("/upload-scan");
    } else {
      alert("Enter valid credentials!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Technician Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

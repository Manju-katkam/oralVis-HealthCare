import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DentistLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("role", "dentist");
      navigate("/view-scans");
    } else {
      alert("Enter valid credentials!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dentist Login</h2>
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
        <button className="bg-green-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Logo */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616655.png" // Tooth logo
        alt="Dentist Logo"
        className="w-24 h-24 mb-6"
      />

      {/* Heading */}
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        OralVis HealthCare
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        A secure platform where technicians upload dental scan images, and
        dentists can review them to provide better care for patients.
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <Link
          to="/technician-login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Technician Login
        </Link>
        <Link
          to="/dentist-login"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Dentist Login
        </Link>
      </div>
    </div>
  );
}

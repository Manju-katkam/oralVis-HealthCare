import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewScans = () => {
  const [scans, setScans] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch scans on page load
  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/scans");
      setScans(res.data);
    } catch (error) {
      console.error("Error fetching scans:", error);
    }
  };

  // ✅ Delete scan
 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this scan?")) return;

  try {
    const res = await axios.delete(`http://localhost:5000/api/scans/${id}`);
    if (res.data.success) {
      setScans(scans.filter((scan) => scan.id !== id));
      alert("Scan deleted successfully!");
    } else {
      alert("Failed to delete scan.");
    }
  } catch (error) {
    console.error("Delete request error:", error);
    alert("Delete request failed.");
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        🦷 Patient Scan Records
      </h2>

      {scans.length === 0 ? (
        <p className="text-gray-500">No scans uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="border rounded-xl shadow-lg p-4 bg-white hover:shadow-xl transition"
            >
              {/* Thumbnail */}
              <img
                src={scan.imageUrl}
                alt="scan"
                className="w-full h-40 object-cover rounded-md cursor-pointer"
                onClick={() => setSelectedImage(scan.imageUrl)}
              />

              {/* Patient Info */}
              <div className="mt-3 text-sm">
                <p>
                  <span className="font-semibold">Patient:</span>{" "}
                  {scan.patientName}
                </p>
                <p>
                  <span className="font-semibold">Patient ID:</span>{" "}
                  {scan.patientId}
                </p>
                <p>
                  <span className="font-semibold">Scan Type:</span>{" "}
                  {scan.scanType}
                </p>
                <p>
                  <span className="font-semibold">Region:</span> {scan.region}
                </p>
                <p>
                  <span className="font-semibold">Uploaded:</span>{" "}
                  {new Date(scan.uploadDate).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedImage(scan.imageUrl)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(scan.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Full Scan"
              className="max-w-[90vw] max-h-[80vh] rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewScans;

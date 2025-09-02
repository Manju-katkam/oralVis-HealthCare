import { useState } from "react";
import axios from "axios";

export default function UploadScan() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    scanType: "RGB",
    region: "Frontal",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a scan image");

    try {
      setLoading(true);

      // Prepare data for backend
      const data = new FormData();
      data.append("patientName", formData.patientName);
      data.append("patientId", formData.patientId);
      data.append("scanType", formData.scanType);
      data.append("region", formData.region);
      data.append("file", file);

      // Call backend API
      await axios.post("http://localhost:5000/api/scans", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Scan uploaded successfully!");

      // Reset form
      setFormData({
        patientName: "",
        patientId: "",
        scanType: "RGB",
        region: "Frontal",
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Technician – Upload Scan
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow p-6 rounded-lg"
      >
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          className="w-full border p-2 rounded"
          value={formData.patientName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="patientId"
          placeholder="Patient ID"
          className="w-full border p-2 rounded"
          value={formData.patientId}
          onChange={handleChange}
          required
        />

        <select
          name="scanType"
          className="w-full border p-2 rounded"
          value={formData.scanType}
          onChange={handleChange}
        >
          <option value="RGB">RGB</option>
        </select>

        <select
          name="region"
          className="w-full border p-2 rounded"
          value={formData.region}
          onChange={handleChange}
        >
          <option value="Frontal">Frontal</option>
          <option value="Upper Arch">Upper Arch</option>
          <option value="Lower Arch">Lower Arch</option>
        </select>

        <input
          type="file"
          accept="image/png, image/jpeg"
          className="w-full border p-2 rounded"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Scan"}
        </button>
      </form>
    </div>
  );
}

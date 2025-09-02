import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// SQLite connection
let db;
(async () => {
  db = await open({
    filename: "./scans.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientName TEXT,
      patientId TEXT,
      scanType TEXT,
      region TEXT,
      imageUrl TEXT,
      uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
})();

// Upload scan API
app.post("/api/scans", upload.single("file"), async (req, res) => {
  try {
    const { patientName, patientId, scanType, region } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    await db.run(
      `INSERT INTO scans (patientName, patientId, scanType, region, imageUrl)
       VALUES (?, ?, ?, ?, ?)`,
      [patientName, patientId, scanType, region, imageUrl]
    );

    res.json({ success: true, imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

// Get scans API
app.get("/api/scans", async (req, res) => {
  try {
    const scans = await db.all("SELECT * FROM scans ORDER BY uploadDate DESC");
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch scans" });
  }
});


// ✅ Delete scan API
app.delete("/api/scans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🟡 Delete request received for ID:", id);

    // Find scan entry
    const scan = await db.get("SELECT * FROM scans WHERE id = ?", [id]);
    if (!scan) {
      console.log("❌ Scan not found in DB");
      return res.status(404).json({ error: "Scan not found" });
    }

    console.log("✅ Found scan in DB:", scan);

    // Extract file path from imageUrl
    const fileName = path.basename(scan.imageUrl);
    const filePath = path.join(__dirname, "uploads", fileName);
    console.log("📂 File path to delete:", filePath);

    // Delete image file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🗑️ Deleted file:", filePath);
    } else {
      console.log("⚠️ File not found:", filePath);
    }

    // Delete DB record
    await db.run("DELETE FROM scans WHERE id = ?", [id]);
    console.log("✅ Deleted DB record for ID:", id);

    res.json({ success: true, message: "Scan deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Failed to delete scan" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);

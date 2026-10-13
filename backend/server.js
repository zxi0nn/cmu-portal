const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to your local MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "cmu_portal_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database: cmu_portal_db");
});

// Test route to confirm server is working
app.get("/", (req, res) => {
  res.send("CMU Portal Backend is running live!");
});

// 1. Fetch live student records from your database
app.get("/api/records", (req, res) => {
  db.query("SELECT * FROM student_records", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 2. Fetch document requests for your Admin Portal
app.get("/api/requests", (req, res) => {
  db.query("SELECT * FROM document_requests", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Start server on port 5001
app.listen(5001, () => {
  console.log("Backend server running on http://localhost:5001");
});

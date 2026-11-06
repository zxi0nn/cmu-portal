const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Importante ito para makatanggap ng data galing sa form

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "e-reg-muselkfan27-47f9.f.aivencloud.com",
  port: process.env.DB_PORT || 24348,
  user: process.env.DB_USER || "avnadmin",
  password: "AVNS_FFoE80hWOAYTvw2oJ5F",
  database: "defaultdb",
  ssl: { rejectUnauthorized: false },
});

// Default Route (Para ma-check kung Live)
app.get("/", (req, res) => {
  res.send("CMU Portal Backend is Live!");
});

// --- GET ROUTES (Para kumuha at magpakita ng data sa system) ---

app.get("/api/requests", (req, res) => {
  db.query("SELECT * FROM requests", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get("/api/records", (req, res) => {
  db.query("SELECT * FROM records", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// --- POST ROUTES (Para mag-save ng bagong data galing sa system) ---

app.post("/api/requests", (req, res) => {
  const data = req.body;
  db.query("INSERT INTO requests SET ?", data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Request added successfully", id: result.insertId });
  });
});

app.post("/api/records", (req, res) => {
  const data = req.body;
  db.query("INSERT INTO records SET ?", data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Record added successfully", id: result.insertId });
  });
});

// Port Configuration
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

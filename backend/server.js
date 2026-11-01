const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "e-reg-muselkfan27-47f9.f.aivencloud.com",
  port: process.env.DB_PORT || 24348,
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASSWORD,
  database: "defaultdb",
  ssl: { rejectUnauthorized: false },
});
app.get("/", (req, res) => {
  res.send("CMU Portal Backend is Live!");
});
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

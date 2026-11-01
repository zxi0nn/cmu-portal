const db = mysql.createConnection({
  host: "e-reg-muselkfan27-47f9.f.aivencloud.com",
  port: 24348,
  user: "avnadmin",
  password: process.env.DB_PASSWORD, // <-- HINDI DAPAT NAKALAGAY ANG TOTOONG PASSWORD DITO
  database: "defaultdb",
  ssl: { rejectUnauthorized: false },
});

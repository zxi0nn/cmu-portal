const db = mysql.createConnection({
  host: process.env.DB_HOST || "e-reg-muselkfan27-47f9.f.aivencloud.com",
  port: process.env.DB_PORT || 24348,
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASSWORD,
  database: "defaultdb",
  ssl: { rejectUnauthorized: false },
});

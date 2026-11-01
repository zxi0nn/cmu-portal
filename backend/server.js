<<<<<<< HEAD
// Replace your old db connection with this one
const db = mysql.createConnection({
  host: "YOUR_AIVEN_HOST", // Paste the "Host" from Aiven (e-reg-muselkfan27...)
  port: 24348, // Paste the "Port" from Aiven
  user: "avnadmin", // Paste the "User" from Aiven
  password: "AVNS_FFoE80hWOAYTvw2oJ5F", // Click "Reveal password" on Aiven and paste it here
  database: "defaultdb", // Aiven uses 'defaultdb' as the default database name
  ssl: {
    rejectUnauthorized: false, // Required by Aiven to ensure a secure connection
  },
=======
const db = mysql.createConnection({
  host: "e-reg-muselkfan27-47f9.f.aivencloud.com",
  port: 24348,
  user: "avnadmin",
  password: process.env.DB_PASSWORD, // <-- HINDI DAPAT NAKALAGAY ANG TOTOONG PASSWORD DITO
  database: "defaultdb",
  ssl: { rejectUnauthorized: false },
>>>>>>> fresh-deploy
});

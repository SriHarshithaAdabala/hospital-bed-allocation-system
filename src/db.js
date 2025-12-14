const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("DB Connection Error:", err);
  else console.log("DB connected:", res.rows[0]);
});

module.exports = pool;

const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    
    const connection = await pool.getConnection();
    console.log("Connected To database");
    connection.release();
  } catch (error) {
    console.log("Failed to connect Database : ", error);
    process.exit(1);
  }
})();

module.exports = pool;

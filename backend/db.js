// backend/db.js


require("dotenv").config();
const mysql = require("mysql2/promise");

const DB_NAME = process.env.DB_NAME || "ca.shaurya_db";

const isCloudDB = process.env.DB_HOST?.includes("aivencloud.com") || process.env.DB_SSL === "true";

const connectionConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  port: Number(process.env.DB_PORT || process.env.DBPORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: isCloudDB ? { rejectUnauthorized: false } : undefined,
};

const pool = mysql.createPool({
  ...connectionConfig,
  database: DB_NAME,
});

async function initDB() {
  try {
    let connection;
    try {
      connection = await pool.getConnection();
    } catch (connErr) {
      if (connErr.code === 'ER_BAD_DB_ERROR') {
        const rootPool = mysql.createPool(connectionConfig);
        const rootConn = await rootPool.getConnection();
        await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
        rootConn.release();
        await rootPool.end();
        connection = await pool.getConnection();
      } else {
        throw connErr;
      }
    }

    try {
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
      await connection.query(`USE \`${DB_NAME}\``);
    } catch (dbErr) {
      // Ignore if database is pre-selected
    }

    console.log(`✅ Database "${DB_NAME}" is ready.`);

    // ---------------- FAQ TABLE ----------------
    await connection.query(`
      CREATE TABLE IF NOT EXISTS faqs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        question TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ---------------- REGISTRATIONS TABLE ----------------
    await connection.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        gender ENUM('Male','Female','Other') NOT NULL,
        dob DATE NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        college VARCHAR(255) NOT NULL,
        cityState VARCHAR(255) NOT NULL,
        degreeYear VARCHAR(255) NOT NULL,
        heardAbout VARCHAR(255) NOT NULL,
        hasExperience BOOLEAN NOT NULL,
        pastExperience TEXT,
        motivation TEXT NOT NULL,
        unique_id VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Safely attempt to add the column to the existing table
    try {
      await connection.query(`ALTER TABLE registrations ADD COLUMN unique_id VARCHAR(255) UNIQUE`);
    } catch (err) {
      // Ignore if the column already exists
    }

    console.log("✅ Tables for FAQ and Registrations are ready.");

    connection.release();
  } catch (error) {
    console.error("❌ Error setting up database:", error);
  }
}

module.exports = { pool, initDB };

// backend/models/registrationModel.js

const { pool } = require('../db');
const crypto = require('crypto');

async function createRegistration(data) {
  try {
    // Generate a shorter 8-character unguessable ID, prefixed with 'CA-'
    const unique_id = 'CA-' + crypto.randomBytes(4).toString('hex').toUpperCase();
    
    const sql = `
      INSERT INTO registrations 
      (fullName, gender, dob, email, phone, college, cityState, degreeYear, heardAbout, hasExperience, pastExperience, motivation, unique_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.fullName, data.gender, data.dob, data.email, data.phone,
      data.college, data.cityState, data.degreeYear, data.heardAbout,
      data.hasExperience, data.pastExperience, data.motivation, unique_id
    ];
    const [result] = await pool.query(sql, values);
    return { id: result.insertId, unique_id, ...data };
  } catch (err) {
    if(err)
      throw new Error('DB Error: Could not insert registration');
  }
}

async function getAllRegistrations() {
  try {
    const [rows] = await pool.query("SELECT * FROM registrations ORDER BY created_at DESC");
    return rows;
  } catch (err) {
    if(err)
      throw new Error('DB Error: Could not fetch registrations');
  }
}

async function findByEmail(email) {
  try {
    const [rows] = await pool.query("SELECT id FROM registrations WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    if(err)
      throw new Error('DB Error: Could not fetch registration by email');
  }
}

module.exports = { createRegistration, getAllRegistrations, findByEmail };

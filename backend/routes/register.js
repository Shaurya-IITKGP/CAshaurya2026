//backend/routes/register.js

/* eslint-env node */
const express = require('express');
const { body, validationResult } = require('express-validator');
const { createRegistration, getAllRegistrations, findByEmail } = require('../models/registrationModel');
const ExcelJS = require('exceljs');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ✅ GET all registrations (protected)
router.get('/', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const registrations = await getAllRegistrations();
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Export registrations as Excel
router.get('/export', async (req, res) => {
  if (req.query.token !== process.env.EXPORT_SECRET) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const data = await getAllRegistrations();
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Registrations');

    sheet.columns = [
      { header: 'Name', key: 'fullName' },
      { header: 'Email', key: 'email' },
      { header: 'Phone', key: 'phone' },
      { header: 'College', key: 'college' },
      { header: 'Gender', key: 'gender' },
      { header: 'DOB', key: 'dob' },
      { header: 'City/State', key: 'cityState' },
      { header: 'Degree/Year', key: 'degreeYear' },
      { header: 'Heard About', key: 'heardAbout' },
      { header: 'Experience', key: 'hasExperience' },
      { header: 'Past Exp.', key: 'pastExperience' },
      { header: 'Motivation', key: 'motivation' },
      { header: 'Created At', key: 'created_at' }
    ];

    data.forEach(entry => sheet.addRow(entry));

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=registrations.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).send('Failed to export data');
  }
});

// ✅ POST with validation
router.post(
  '/',
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    body('dob').isISO8601().withMessage('Invalid date of birth'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('phone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
    body('college').trim().notEmpty().withMessage('College is required'),
    body('cityState').trim().notEmpty().withMessage('City/State is required'),
    body('degreeYear').trim().notEmpty().withMessage('Degree/Year is required'),
    body('heardAbout').trim().notEmpty().withMessage('This field is required'),
    body('hasExperience').isBoolean().withMessage('Experience must be true/false'),
    body('pastExperience').optional().trim().isLength({ max: 1000 }).withMessage('Too long'),
    body('motivation').trim().notEmpty().isLength({ max: 1000 }).withMessage('Required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    try {
      // Check if user already exists
      const existingUser = await findByEmail(req.body.email);
      if (existingUser) {
        return res.status(409).json({ message: 'An ambassador with this email is already registered.' });
      }

      const saved = await createRegistration(req.body);

      const { fullName, email } = req.body;
      const { unique_id } = saved;

      transporter.sendMail({
        from: `"Shaurya, IIT Kharagpur" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Welcome to the Shaurya Campus Ambassador Program!',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <!-- Header -->
            <div style="background-color: #121216; padding: 25px 20px; text-align: center; border-bottom: 4px solid #facc15;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; text-transform: uppercase;">Welcome to Shaurya</h2>
              <p style="color: #facc15; margin: 5px 0 0 0; font-size: 14px; font-weight: bold; letter-spacing: 2px;">CAMPUS AMBASSADOR PROGRAM</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 30px;">
              <p style="font-size: 16px;">Dear <strong>${fullName}</strong>,</p>
              <p style="font-size: 15px; color: #444;">Congratulations! We are thrilled to officially welcome you as a Campus Ambassador for Shaurya, IIT Kharagpur's annual sports festival.</p>
              
              <div style="background-color: #fcfcfc; border-left: 4px solid #facc15; border-radius: 4px; padding: 15px 20px; margin: 30px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <p style="margin: 0; font-size: 13px; color: #777; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Your Official CA ID</p>
                <h3 style="margin: 5px 0 0 0; color: #121216; font-size: 24px; letter-spacing: 3px; font-family: monospace;">${unique_id}</h3>
              </div>
              
              <p style="font-size: 15px; color: #444; font-weight: bold; color: #d97706;">⚠️ Please keep this Unique ID safe.</p>
              <p style="font-size: 14px; color: #555;">It will be required for all future correspondence, referrals, and leaderboard tracking during the festival.</p>
              
              <p style="font-size: 15px; color: #444; margin-top: 30px;">Our team will reach out to you shortly with the onboarding kit and next steps. We look forward to working with you!</p>
            </div>
            
            <!-- Footer / Digital Signature -->
            <div style="background-color: #f4f4f5; padding: 30px; text-align: left; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 15px 0; font-size: 14px; color: #555;">Best regards,</p>
              <p style="margin: 0 0 20px 0; font-size: 16px; font-weight: bold; color: #121216;">The Shaurya Team</p>
              
              <div style="display: flex; align-items: center; gap: 20px;">
                <img src="https://ca.shauryaiitkgp.in/logos/Shaurya_Logo.png" alt="Shaurya Logo" style="height: 60px; width: auto; object-fit: contain;" />
                <div style="border-left: 2px solid #ccc; height: 50px;"></div>
                <img src="https://ca.shauryaiitkgp.in/logos/Platinum_Jubilee.png" alt="IIT KGP Logo" style="height: 60px; width: auto; object-fit: contain;" />
              </div>
              
              <div style="margin-top: 20px; font-size: 12px; color: #888;">
                <p style="margin: 2px 0;">Technology Students' Gymkhana</p>
                <p style="margin: 2px 0;">Indian Institute of Technology Kharagpur</p>
                <p style="margin: 2px 0;">Kharagpur, West Bengal 721302</p>
              </div>
            </div>
          </div>
        `
      }).catch(err => console.error("Error sending user email:", err));

      transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: 'angothugopichand.shaurya.iitkgp@gmail.com',
        subject: `New CA Registered: ${fullName}`,
        text: `A new Campus Ambassador registered:\n\nName: ${fullName}\nEmail: ${email}\nUnique ID: ${unique_id}`
      }).catch(err => console.error("Error sending admin email:", err));

      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: 'Failed to save registration' });
    }
  }
);

module.exports = router;

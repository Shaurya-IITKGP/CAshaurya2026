// backend/routes/faq.js


const express = require('express');
const { body, validationResult } = require('express-validator');
const { createFAQ, getAllFAQs } = require('../models/faqModel');
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

router.post('/', [
  body('name').trim().notEmpty(),
  body('phone').matches(/^\d{10}$/),
  body('email').isEmail().normalizeEmail(),
  body('question').trim().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const faq = await createFAQ(req.body);
    
    const { name, email, phone, question } = req.body;

    transporter.sendMail({
      from: `"Shaurya, IIT Kharagpur" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Thank you for your question - Shaurya IIT KGP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #facc15; padding-bottom: 10px;">Question Received</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to us! This email is to confirm that we have received your question.</p>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #facc15; padding: 15px; margin: 25px 0;">
            <p style="margin: 0; font-size: 14px; color: #555;">Your Question:</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-style: italic;">"${question}"</p>
          </div>
          
          <p>Our team is currently reviewing your inquiry and will get back to you with an answer as shortly as possible.</p>
          
          <p>Best regards,<br/><strong>The Shaurya Team</strong><br/>IIT Kharagpur</p>
        </div>
      `
    }).catch(err => console.error("Error sending user email:", err));

    transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'angothugopichand.shaurya.iitkgp@gmail.com',
      subject: `New FAQ Submitted by ${name}`,
      text: `A new FAQ was submitted:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nQuestion: ${question}`
    }).catch(err => console.error("Error sending admin email:", err));

    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ message: 'Could not save FAQ' });
  }
});

router.get('/export', async (req, res) => {
  if (req.query.token !== process.env.EXPORT_SECRET) return res.status(403).json({ message: 'Access denied' });

  try {
    const data = await getAllFAQs();
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('FAQs');

    sheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Phone', key: 'phone' },
      { header: 'Question', key: 'question' },
      { header: 'Created At', key: 'created_at' }
    ];

    data.forEach(entry => sheet.addRow(entry));

    res.setHeader('Content-Disposition', 'attachment; filename=faqs.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).send('Failed to export');
  }
});

module.exports = router;

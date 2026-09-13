//backend/server.js


/* eslint-env node */
const express = require('express');
const dotenv = require('dotenv');
const db = require('./db'); // import after dotenv
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

dotenv.config();

const app = express();

// ✅ Trust proxy (important when Nginx is in front)
app.set('trust proxy', 1);

// Allowed origins (update with your actual frontend domains)
const allowedOrigins = [
  'http://localhost:5173',
  'https://ca.shauryaiitkgp.in',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ API rate limiter (100 requests/minute per IP for API routes)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ Stricter rate limiter for registration (10 per minute per IP)
const registrationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Too many registration attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply general API limiter to all /api routes
app.use('/api', apiLimiter);

const { initDB } = require('./db');
initDB();

// ✅ Routes
app.use('/api/register', require('./routes/register'));
app.use('/api/faq', require('./routes/faq'));
app.use('/api/admin', require('./routes/admin'));

// ✅ Serve frontend static files in production
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// ✅ SPA fallback — serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

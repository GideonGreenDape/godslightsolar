const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const emailText = Object.entries(data)
    .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
    .join('\n');

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'glightise@gmail.com',
      subject: 'New Solar Empowerment Application',
      text: `A new application has been submitted:\n\n${emailText}`
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Empowerment Email error:', error);
    res.status(500).json({ error: 'Failed to send application' });
  }
});

module.exports = router;

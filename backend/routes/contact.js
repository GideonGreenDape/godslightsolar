const express = require('express');
const { sendContactEmail } = require('../utils/mailer');

const router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const result = await sendContactEmail({ name, email, phone, message });
    res.status(200).json({ success: true, delivered: result.delivered });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

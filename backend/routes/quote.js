const express = require('express');
const { generateQuotePdf } = require('../utils/pdfGenerator');

const router = express.Router();

router.post('/pdf', (req, res, next) => {
  try {
    const { customer, appliances, totals } = req.body || {};

    if (!Array.isArray(appliances) || appliances.length === 0) {
      return res.status(400).json({ error: 'At least one appliance is required to generate a quote.' });
    }
    if (!totals || typeof totals.dailyWh !== 'number') {
      return res.status(400).json({ error: 'Totals summary is required to generate a quote.' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="godslight-solars-quote.pdf"');

    generateQuotePdf({ customer, appliances, totals }, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

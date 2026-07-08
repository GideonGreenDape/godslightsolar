const nodemailer = require('nodemailer');

function isMailerConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendContactEmail({ name, email, phone, message }) {
  if (!isMailerConfigured()) {
    console.log('[contact] SMTP not configured, logging submission instead:', { name, email, phone, message });
    return { delivered: false };
  }

  const transporter = getTransporter();
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Godslight Solars Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: email,
    subject: `New website enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
  });

  return { delivered: true };
}

module.exports = { sendContactEmail, isMailerConfigured };

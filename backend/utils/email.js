const nodemailer = require('nodemailer');

/**
 * Huge/scalable SMTP: we create a pooled transporter.
 * For production, point to a provider (e.g., SES, SendGrid SMTP, Mailgun SMTP).
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  pool: true,
  maxConnections: Number(process.env.SMTP_MAX_CONNECTIONS || 5),
  maxMessages: Number(process.env.SMTP_MAX_MESSAGES || 100),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendVerificationEmail(to, token) {
  const verifyUrl = `${process.env.WEB_APP_ORIGIN}/verify-email?token=${encodeURIComponent(token)}`;
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || '"Acme Shop" <no-reply@acme.shop>',
    to,
    subject: 'Verify your email',
    text: `Click to verify your email: ${verifyUrl}`,
    html: `<p>Welcome! Click the button below to verify your email.</p>
           <p><a href="${verifyUrl}" style="display:inline-block;padding:10px 16px;border-radius:6px;background:#4f46e5;color:#fff;text-decoration:none">Verify Email</a></p>`,
  });
  return info;
}

module.exports = { transporter, sendVerificationEmail };

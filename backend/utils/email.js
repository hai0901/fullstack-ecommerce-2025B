const nodemailer = require('nodemailer');

async function makeTransport() {
  if (process.env.USE_ETHEREAL) {
    const acct = await nodemailer.createTestAccount();
    console.log('[email] Using Ethereal:', acct.user);
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: { user: acct.user, pass: acct.pass },
    });
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

let transporterPromise = null;
async function sendVerificationEmail(to, token) {
  if (!transporterPromise) transporterPromise = makeTransport();
  const transporter = await transporterPromise;
  const verifyUrl = `${process.env.WEB_APP_ORIGIN}/verify-email?token=${encodeURIComponent(token)}`;

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || '"Acme Shop" <no-reply@acme.shop>',
    to, subject: 'Verify your email',
    text: `Verify: ${verifyUrl}`,
    html: `<a href="${verifyUrl}">Verify</a>`,
  });

  const preview = nodemailer.getTestMessageUrl?.(info);
  if (preview) console.log('[email] Ethereal preview:', preview);
  return info;
}

module.exports = { sendVerificationEmail };

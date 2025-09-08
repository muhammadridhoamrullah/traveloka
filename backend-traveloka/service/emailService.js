const nodemailer = require("nodemailer");

const myEmail = process.env.EMAIL;
const myPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myEmail,
    pass: myPassword,
  },
});

async function sendVerificationEmail(data) {
  const mailOptions = {
    from: myEmail,
    to: data.email,
    subject: `Traveloka - Verify Your Email`,
    html: `
    <h3>Welcome to Traveloka, ${data.firstName}!</h3>
    <p>Thank you for registering. Please verify your email by clicking the link below:</p>
    <a href="${data.link}">Verify Email</a>
    <p>This link will expire in 1 hour.</p>

    <p>If you did not sign up for this account, please ignore this email.</p>
    <p>Best regards,<br/>Traveloka Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
};

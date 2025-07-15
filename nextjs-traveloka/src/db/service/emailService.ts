import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;
  const mailOptions = {
    from: `Traveloka <${process.env.EMAIL_USER}>`,
    to,
    subject: "Traveloka Email Verification",
    html: `
    <h1>Welcome to Traveloka!</h1>
    <p>Thank you for registering, please verify your email by clicking this link below:</p>
    <a href="${verificationUrl}">Verify Email</a>
    <p>---------------------------------------</p>
    <p>If you did not register, please ignore this email.</p>
    <p>Thank you for choosing Traveloka!</p>
    <p>Best regards,</p>
    <p>Traveloka Team</p>
    <p><small>This is an automated message, please do not reply to this email.</small></p>
    <p><small>If you have any questions, please contact our support team.</small></p>
    <p><small>For more information, visit our <a href="${process.env.BASE_URL}">website</a>.</small></p>

    `,
  };

  await transporter.sendMail(mailOptions);
}

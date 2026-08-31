import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (to, resetLink) => {
  await transporter.sendMail({
    from: `"Nex-Style Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Nex-Style Admin Password Reset",
    html:` 
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #24334d;">Nex-Style Admin Password Reset</h2>

        <p>You requested to reset your Nex-Style Admin password.</p>

        <p>Click the button below to create a new password:</p>

        <a
          href="${resetLink}"
          style="display: inline-block; padding: 12px 20px; background: #24334d; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;"
        >
          Reset Admin Password
        </a>

        <p style="margin-top: 25px; color: #666; font-size: 13px;">
          This password reset link will expire shortly for security reasons.
        </p>

        <p style="color: #666; font-size: 13px;">
          If you did not request this reset, you can safely ignore this email.
        </p>
      </div>
    `
  });
};
import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Verify your account",
      text: `Your OTP code is: ${otp}`,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
    throw new Error("Email not sent");
  }
};
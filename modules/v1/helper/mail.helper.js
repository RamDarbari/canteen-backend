const nodemailer = require("nodemailer");
const mailBody = require("../constants/mailBody");
const { generateOTP } = require("./utils");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (email, subject, type, data) => {
  try {
    let generatedOTP = generateOTP();

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: mailBody(data, type, email, generatedOTP),
    };

    const result = await transporter.sendMail(mailOptions);

    if (type == "sendOtp") return { otp: generatedOTP };
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { sendMail };

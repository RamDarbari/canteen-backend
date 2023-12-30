const nodemailer = require("nodemailer");
const otp = require("otp-generator");
const smtpPool = require("nodemailer-smtp-pool");

const transporter = nodemailer.createTransport(
  smtpPool({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
);

const sendEmail = async (email) => {
  console.log(sendEmail,"emaillllllllllll");
  try {
    const generatedOTP = generateOTP();
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Email Verification",
      html: generateEmailContent(email, generatedOTP),
    };
    const result = await transporter.sendMail(mailOptions);
    return { otp: generatedOTP };
  } catch (error) {
    return { error: error.message };
  }
};

const generateOTP = () => {
  return otp.generate(6, { upperCase: false, specialChars: false });
};

const generateEmailContent = (email, generatedOTP) => {
  return `
 <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="background-color: #f2f3f8; margin: 0px; padding: 0px; text-align: center;">
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" align="center" style="margin: auto;">
            <tbody>
                <tr>
                    <td style="padding-top: 1rem; text-align: center; width: 100%;">
                        <table width="80%" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 10px; text-align: center; -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); margin: auto;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table style="margin: 0px auto; ">
                                            <tbody>
                                                <tr>
                                                    <td style="text-align: center; padding-top: 1rem"></td>
                                                </tr>
                                                <tr>
                                                    <td style="opacity: 1; color: rgba(20, 15, 38, 1); font-size: 20px; font-weight: 700; font-style: normal; letter-spacing: 0px; text-align: center; padding-top: 1rem; padding-bottom: 1rem;">
                                                        Email verification 
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="opacity: 1; color: rgba(20, 15, 38, 1); font-size: 20px; font-weight: 700; font-style: normal; letter-spacing: 0px; text-align: center; padding-top: 1rem; padding-bottom: 1rem;">
                                                        Hi ${email}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="opacity: 1; color: rgba(20, 15, 38, 1); font-size: 12px; font-weight: 400; font-style: normal; letter-spacing: 0px; text-align: center; line-height: 24px;">
                                                        We received a request to verify your email.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="opacity: 1; color: rgba(20, 15, 38, 1); font-size: 12px; font-weight: 400; font-style: normal; letter-spacing: 0px; text-align: center; line-height: 24px; padding-top: 1.5rem; padding-bottom: 1.5rem;">
                                                        Please confirm your email address by entering the OTP code below:
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="display: flex; flex-direction: row; justify-content: center">
                                                        <table style="margin: auto">
                                                            <tbody>
                                                                ${generatedOTP.split('').map(char => `
                                                                    <td style="opacity: 1; padding-left: 15px; padding-right: 15px; padding-top: 15px; padding-bottom: 15px; margin-right: 6px; background-color: #ecedf2; border-radius: 8px; color: #140f26; font-size: 20px; font-weight: 600; font-style: normal; letter-spacing: 0px; text-align: center; line-height: 20px;">
                                                                        ${char}
                                                                    </td>
                                                                `).join('')}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="opacity: 1; padding-top: 1rem; padding-bottom: 1rem; color: rgba(20, 15, 38, 1); font-size: 12px; font-weight: 400; font-style: normal; letter-spacing: 0px; text-align: center; line-height: 24px;">
                                                        If you didn’t make this request, ignore this email.<br />Thank you for choosing our service.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
        <td style="text-align: center; font-size: 12px;padding:10px;">
            ©Seasiainfotech
        </td>
      </tr>
            </tbody>
        </table>
    </body>
    </html>
  `
};

module.exports = { sendEmail };

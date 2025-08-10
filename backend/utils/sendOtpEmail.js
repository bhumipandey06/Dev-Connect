const sendEmail = require("../config/email");
const generateOtp = require("./generateOtp");

const sendOtpEmail = async (email, purpose) => {
  const otp = generateOtp();
  const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

  let subject, html;
  if (purpose === "registration") {
    subject = "Your DevConnect Registration OTP";
    html = `<p>Your OTP for DevConnect registration is <b>${otp}</b>.</p>
            <p>It will expire in 10 minutes.</p>`;
  } else {
    subject = "Your DevConnect Password Reset OTP";
    html = `<p>Your OTP for password reset is <b>${otp}</b>.</p>
            <p>It will expire in 10 minutes.</p>`;
  }

  await sendEmail(email, subject, html);

  return { otp, expiry };
};

module.exports = sendOtpEmail;

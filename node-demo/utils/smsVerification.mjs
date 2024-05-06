import twilio from "twilio";

export const otpSender = async (mobile, otp) => {
  const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

  const otpBody = `🔒 Your One-Time Password (OTP) for verification: ${otp}. Keep it safe and do not share it with anyone. Happy verifying! 🚀
    `;

  return client.messages
    .create({
      body: otpBody,
      to: "", //Add twilio number
      from: mobile,
    })
    .then((message) => {
      console.log("- SMS sent successfully by message id".green, message.sid);
      return message;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

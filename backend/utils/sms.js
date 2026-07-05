// backend/utils/sms.js
const twilio = require("twilio");

const sendSMS = async (to, message) => {
  const accountSid = process.env.TWILIO_SID; 
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_PHONE;

  if (!accountSid || !authToken || !twilioNumber) {
    return;
  }

  try {
    const client = twilio(accountSid, authToken);

    const response = await client.messages.create({
      body: message,
      from: twilioNumber,
      to: to,
    });

    console.log("✅ SMS sent successfully! SID");
  } catch (error) {
    console.error("❌ Twilio SDK Error:", error.message);
  }
};

module.exports = sendSMS;
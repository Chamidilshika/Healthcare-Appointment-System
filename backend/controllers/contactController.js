const nodemailer = require("nodemailer");

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, 
      subject: `New Contact Message from ${name}`,
      text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
                `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Email sent successfully",
    });

    } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
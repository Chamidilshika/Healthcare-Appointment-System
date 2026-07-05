const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 📝 REGISTER PATIENT / USER
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "patient", 
    });

    const savedUser = user.toObject();
    delete savedUser.password;

    res.status(201).json({
      success: true,
      user: savedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 🔑 LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
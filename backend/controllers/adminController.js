const User = require("../models/User");
const Appointment = require("../models/Appointment");
const bcrypt = require("bcryptjs");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL DOCTORS
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL APPOINTMENTS (SYSTEM VIEW)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name email specialization");

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE DOCTOR (ADMIN)
exports.createDoctor = async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);
    console.log("📸 FILE:", req.file);

    const {
      name,
      email,
      password,
      specialization,
      experience,
      fee,
      phone,
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing email
    const existingDoctor = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Convert experience and fee
    const parsedExperience = Number(experience) || 0;
    const parsedFee = Number(fee) || 0;

    // Image
    const imageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";

    // Create Doctor
    const doctor = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // Admin entered password
      role: "doctor",
      specialization: specialization || "",
      experience: parsedExperience,
      fee: parsedFee,
      phone: phone || "",
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        experience: doctor.experience,
        fee: doctor.fee,
        phone: doctor.phone,
        image: doctor.image,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
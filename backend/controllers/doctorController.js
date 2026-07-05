const User = require("../models/User");

// CREATE DOCTOR (ADMIN ONLY)
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await User.create({
      ...req.body,
      role: "doctor",
    });

    res.status(201).json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL DOCTORS
exports.getDoctors = async (req, res) => {
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

// GET SINGLE DOCTOR
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await User.findOne({
      _id: req.params.id,
      role: "doctor",
    });

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE DOCTOR
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await User.findOneAndUpdate(
      { _id: req.params.id, role: "doctor" },
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE DOCTOR
exports.deleteDoctor = async (req, res) => {
  try {
    await User.findOneAndDelete({
      _id: req.params.id,
      role: "doctor",
    });

    res.json({
      success: true,
      message: "Doctor deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json({ success: true, appointment });
};
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/email");
const sendSMS = require("../utils/sms");
const User = require("../models/User");

// CREATE APPOINTMENT (PATIENT)
exports.createAppointment = async (req, res) => {
  try {
    console.log("BODY:", req.body);   
    console.log("USER:", req.user);  

    const { doctor, date, time, reason } = req.body;

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      date,
      time,
      reason,
    });

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PATIENT APPOINTMENTS
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("doctor", "name email specialization")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
    })
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS (DOCTOR)
exports.updateStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: 'after' } 
    ).populate("patient", "name email phoneNumber phone"); 

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Process notifications ONLY when approved
    if (req.body.status && req.body.status.toLowerCase() === "approved") {
      const patient = appointment.patient;

      // 📧 SEND EMAIL
      if (patient && patient.email) {
        await sendEmail(
          patient.email,
          "Appointment Approved",
          `Your appointment on ${appointment.date} at ${appointment.time} has been approved.`
        );
      }

      // 📲 SEND SMS
      let patientPhone = patient ? (patient.phoneNumber || patient.phone) : null;

      if (patientPhone) {
        patientPhone = patientPhone.trim();
        if (patientPhone.startsWith("0")) {
          patientPhone = "+94" + patientPhone.substring(1);
        } else if (!patientPhone.startsWith("+")) {
          patientPhone = "+" + patientPhone;
        }

        const cleanDate = new Date(appointment.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });

        await sendSMS(
          patientPhone,
          `Hi ${patient.name}, your appointment is approved for ${cleanDate} at ${appointment.time}.`
        );
      }
    }

    res.json({
      success: true,
      appointment,
    });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE APPOINTMENT
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Appointment deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateStatus,
  deleteAppointment,
} = require("../controllers/appointmentController");

const {
  verifyToken,
} = require("../middleware/authMiddleware");

// CREATE (PATIENT)
router.post("/", verifyToken, createAppointment);

// PATIENT APPOINTMENTS
router.get("/patient", verifyToken, getPatientAppointments);

// DOCTOR APPOINTMENTS
router.get("/doctor", verifyToken, getDoctorAppointments);

// UPDATE STATUS
router.put("/:id", verifyToken, updateStatus);

// DELETE
router.delete("/:id", verifyToken, deleteAppointment);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  getAllDoctors,
  getAllAppointments,
  createDoctor,
} = require("../controllers/adminController");

const upload = require("../utils/upload");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// USERS
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);

// DOCTORS
router.get("/doctors", verifyToken, isAdmin, getAllDoctors);
router.post(
  "/doctors",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createDoctor
);

// APPOINTMENTS
router.get("/appointments", verifyToken, isAdmin, getAllAppointments);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const {
  verifyToken,
  isAdmin,
} = require("../middleware/authMiddleware");

// PUBLIC (any logged-in or even public users)
router.get("/", getDoctors);
router.get("/:id", getDoctor);

// ADMIN ONLY
router.post("/", verifyToken, isAdmin, createDoctor);
router.put("/:id", verifyToken, isAdmin, updateDoctor);
router.delete("/:id", verifyToken, isAdmin, deleteDoctor);

module.exports = router;
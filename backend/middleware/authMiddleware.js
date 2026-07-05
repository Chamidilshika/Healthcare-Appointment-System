const jwt = require("jsonwebtoken");


 // Extracts user from Authorization header and attaches to req.user
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normalize user object (handles id or _id differences)
    req.user = {
      id: decoded.id || decoded._id,
      role: decoded.role,
    };

    if (!req.user.id) {
      return res.status(401).json({
        message: "Invalid token payload (missing user id)",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

 //  ROLE CHECK: ADMIN ONLY
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }

  next();
};

 // ROLE CHECK: DOCTOR ONLY
 
const isDoctor = (req, res, next) => {
  if (!req.user || req.user.role !== "doctor") {
    return res.status(403).json({
      message: "Access denied. Doctors only.",
    });
  }

  next();
};

// ROLE CHECK: PATIENT ONLY
const isPatient = (req, res, next) => {
  if (!req.user || req.user.role !== "patient") {
    return res.status(403).json({
      message: "Access denied. Patients only.",
    });
  }

  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isDoctor,
  isPatient,
};
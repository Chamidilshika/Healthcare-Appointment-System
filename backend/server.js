const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();


// Database
connectDB();


// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL
    ],
    credentials: true
  })
);

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/contact", contactRoutes);


// Test API
app.get("/", (req,res)=>{
    res.send("Backend API is running...");
});


// Local only
if(process.env.NODE_ENV !== "production"){
    app.listen(5000,()=>{
        console.log("Server running on port 5000");
    });
}


module.exports = app;
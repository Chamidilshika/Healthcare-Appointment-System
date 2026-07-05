const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },

    specialization: { type: String, default: "" },
    experience: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    phone: { type: String, default: "" },

    image: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    },
  },
  {
    timestamps: true,
  }
);

// HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function () { 
  if (!this.isModified("password")) return; 

  const bcrypt = require("bcryptjs");
  this.password = await bcrypt.hash(this.password, 10);
  
});
module.exports = mongoose.model("User", userSchema);
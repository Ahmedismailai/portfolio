const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../config/auth");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Admin",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },

    avatar: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    getJwtSecret(),
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    },
  );
};

module.exports = mongoose.model("User", userSchema);

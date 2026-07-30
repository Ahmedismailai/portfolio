const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    percent: { type: Number, required: true },
    icon: { type: String },
    category: { type: String, default: "Frontend" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", skillSchema);

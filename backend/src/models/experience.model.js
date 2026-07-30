const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "BriefcaseBusiness",
    },
    color: {
      type: String,
      default: "from-fuchsia-500 to-violet-600",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experience", experienceSchema);

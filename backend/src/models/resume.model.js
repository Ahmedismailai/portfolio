const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "My Resume",
    },

    file: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);

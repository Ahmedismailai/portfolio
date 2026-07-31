const mongoose = require("mongoose");

const workWithSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "I work with",
    },
    badge: {
      type: String,
      default: "Modern Stack",
    },
    items: [
      {
        name: { type: String, required: true },
        icon: { type: String, required: true },
        color: { type: String, default: "text-white" },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("WorkWith", workWithSchema);

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "FiCode",
    },
    color: {
      type: String,
      default: "from-violet-500 to-fuchsia-500",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);

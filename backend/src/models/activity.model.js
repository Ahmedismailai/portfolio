const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      required: true,
    },

    performedBy: {
      type: String,
      default: "Admin",
    },

    details: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

activitySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Activity", activitySchema);

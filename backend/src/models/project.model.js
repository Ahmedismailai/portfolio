const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    tags: [{ type: String }],
    live: String,
    github: String,
    featured: { type: Boolean, default: true },
  },
  { timestamps: true },
);

projectSchema.index({ featured: -1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    excerpt: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Web Development",
    },

    tags: [String],

    coverImage: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true },
);

blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ featured: -1, createdAt: -1 });

module.exports = mongoose.model("Blog", blogSchema);

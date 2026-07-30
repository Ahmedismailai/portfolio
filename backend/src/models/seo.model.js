const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: "Ahmed Ismail | Full Stack Developer",
    },

    metaDescription: {
      type: String,
      default:
        "Professional Full Stack Developer specializing in Next.js, React, Node.js and MongoDB.",
    },

    metaKeywords: {
      type: String,
      default: "Ahmed Ismail, Full Stack Developer, Next.js, React Developer",
    },

    siteUrl: {
      type: String,
      default: () => (process.env.FRONTEND_URL || "http://localhost:3000").split(",")[0],
    },

    ogImage: {
      url: String,
      public_id: String,
    },

    favicon: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SEO", seoSchema);

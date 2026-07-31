const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: "Portfolio",
      trim: true,
      maxlength: 100,
    },

    siteDescription: {
      type: String,
      default: "Full Stack Developer Portfolio",
      trim: true,
      maxlength: 250,
    },

    heroEyebrow: {
      type: String,
      default: "Available for selected work",
    },

    heroGreeting: {
      type: String,
      default: "Hi, I’m",
    },

    heroName: {
      type: String,
      default: "Ahmed Ismail",
    },

    heroTitle: {
      type: String,
      default: "Full Stack Developer | Web, Mobile & AI Solutions",
    },

    heroDescription: {
      type: String,
      default:
        "Engineering high-performance web platforms, mobile apps, and AI-driven solutions that turn ideas into scalable digital products.",
    },

    heroCards: {
      card1Title: { type: String, default: "Thoughtful interfaces" },
      card1Subtitle: { type: String, default: "Focus" },
      card2Title: { type: String, default: "Detail matters" },
      card2Subtitle: { type: String, default: "From concept to launch" },
      card3Title: { type: String, default: "Clean engineering" },
      card3Subtitle: { type: String, default: "Robust Stack" },
      card4Title: { type: String, default: "Built for impact" },
      card4Subtitle: { type: String, default: "Fast, polished, scalable" },
    },

    heroImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },

    heroSecondaryCtaText: {
      type: String,
      default: "Hire Me",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    aboutBadge: {
      type: String,
      default: "About Me",
    },

    aboutTitle: {
      type: String,
      default: "Full Stack & AI Engineer",
    },

    aboutBio: {
      type: String,
      default:
        "I’m Ahmed Ismail, a passionate Full Stack Developer with 5+ years of experience engineering high-performance web applications, mobile apps, and AI-driven systems. I specialize in modern JavaScript/TypeScript, MERN stack, Next.js, Cloud Architectures, and scalable backend infrastructure.",
    },

    aboutExpYears: {
      type: Number,
      default: 5,
    },

    aboutProjectsCount: {
      type: Number,
      default: 20,
    },

    aboutClientsCount: {
      type: Number,
      default: 15,
    },

    aboutTechCount: {
      type: Number,
      default: 15,
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    footerText: {
      type: String,
      default: "© Portfolio. All rights reserved.",
    },

    theme: {
      type: String,
      enum: ["dark", "light", "system"],
      default: "dark",
    },

    socialLinks: {
      github: String,
      linkedin: String,
      facebook: String,
      twitter: String,
      instagram: String,
    },

    logo: {
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

module.exports = mongoose.model("Setting", settingSchema);

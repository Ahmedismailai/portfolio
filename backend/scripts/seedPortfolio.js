require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const User = require("../src/models/user.model");
const Setting = require("../src/models/setting.model");
const WorkWith = require("../src/models/workWith.model");
const Project = require("../src/models/project.model");
const Blog = require("../src/models/blog.model");
const Experience = require("../src/models/experience.model");
const Service = require("../src/models/service.model");
const Testimonial = require("../src/models/testimonial.model");
const Skill = require("../src/models/skill.model");
const SEO = require("../src/models/seo.model");
const defaultSetting = {
  siteName: "Portfolio",
  siteDescription: "Full stack developer portfolio",
  heroName: "",
  heroTitle: "Full Stack Developer",
  heroDescription: "",
  location: "Available",
  footerText: "© Portfolio. All rights reserved.",
  theme: "dark",
};

const defaultWorkWith = {
  title: "Technologies",
  badge: "Stack",
  items: [],
};

const defaultSEO = {
  metaTitle: "Portfolio",
  metaDescription: "Full stack developer portfolio",
  metaKeywords: "Developer, Full Stack, Portfolio",
};

async function main() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
  await connectDB();
  await Setting.findOneAndUpdate({}, { $setOnInsert: defaultSetting }, { upsert: true, new: true });
  await WorkWith.findOneAndUpdate({}, { $setOnInsert: defaultWorkWith }, { upsert: true, new: true });
  await SEO.findOneAndUpdate({}, { $setOnInsert: { ...defaultSEO, siteUrl: (process.env.FRONTEND_URL || "http://localhost:3000").split(",")[0] } }, { upsert: true, new: true });

  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (name && email && password.length >= 8 && !(await User.exists({ email }))) await User.create({ name, email, password, role: "admin" });
  console.log(`Setup complete.`);
}

if (require.main === module) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; }).finally(() => mongoose.disconnect());
}

module.exports = { main, defaultSetting, defaultWorkWith, defaultSEO };

const asyncHandler = require("express-async-handler");
const Setting = require("../models/setting.model");
const WorkWith = require("../models/workWith.model");
const Project = require("../models/project.model");
const Blog = require("../models/blog.model");
const Experience = require("../models/experience.model");
const Testimonial = require("../models/testimonial.model");
const Service = require("../models/service.model");
const Skill = require("../models/skill.model");

exports.getHomeData = asyncHandler(async (req, res) => {
  const [setting, workWith, projects, blogs, experiences, testimonials, services, skills] =
    await Promise.all([
      Setting.findOne().lean(),
      WorkWith.findOne().lean(),
      Project.find().sort({ featured: -1, createdAt: -1 }).limit(6).lean(),
      Blog.find({ status: "published" }).sort({ createdAt: -1 }).limit(3).lean(),
      Experience.find().sort({ createdAt: -1 }).limit(4).lean(),
      Testimonial.find().sort({ createdAt: -1 }).limit(3).lean(),
      Service.find().sort({ createdAt: -1 }).limit(4).lean(),
      Skill.find().sort({ percent: -1, createdAt: -1 }).limit(10).lean(),
    ]);

  res.json({
    success: true,
    data: {
      setting: setting || null,
      workWith: workWith || { title: "I work with", badge: "Modern Stack", items: [] },
      projects,
      blogs,
      experiences,
      testimonials,
      services,
      skills,
    },
  });
});

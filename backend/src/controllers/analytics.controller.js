const asyncHandler = require("express-async-handler");

const Project = require("../models/project.model");
const Skill = require("../models/skill.model");
const Service = require("../models/service.model");
const Testimonial = require("../models/testimonial.model");
const Contact = require("../models/contact.model");
const Blog = require("../models/blog.model");
const Subscriber = require("../models/subscriber.model");
const Activity = require("../models/activity.model");
const Notification = require("../models/notification.model");

exports.getDashboardAnalytics = asyncHandler(async (req, res) => {
  const [
    projects,
    skills,
    services,
    testimonials,
    messages,
    blogs,
    subscribers,
    activities,
    notifications,
  ] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Service.countDocuments(),
    Testimonial.countDocuments(),
    Contact.countDocuments(),
    Blog.countDocuments(),
    Subscriber.countDocuments(),
    Activity.find().sort({ createdAt: -1 }).limit(10).lean(),
    Notification.find().sort({ createdAt: -1 }).limit(10).lean(),
  ]);

  res.json({
    success: true,

    stats: {
      projects,
      skills,
      services,
      testimonials,
      messages,
      blogs,
      subscribers,
    },

    recentActivities: activities,
    recentNotifications: notifications,
  });
});

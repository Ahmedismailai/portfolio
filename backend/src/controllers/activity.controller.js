const asyncHandler = require("express-async-handler");
const Activity = require("../models/activity.model");

exports.getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find().sort({ createdAt: -1 }).limit(100).lean();

  res.json({
    success: true,
    activities,
  });
});

exports.createActivity = asyncHandler(async (req, res) => {
  const { action, module, details = "" } = req.body;

  if (!action || !module) {
    res.status(400);
    throw new Error("Action and module are required");
  }

  const activity = await Activity.create({
    action: action.toString().slice(0, 100),
    module: module.toString().slice(0, 100),
    performedBy: req.user.name || req.user.email || "Admin",
    details: details.toString().slice(0, 500),
  });

  res.status(201).json({
    success: true,
    activity,
  });
});

const asyncHandler = require("express-async-handler");
const Experience = require("../models/experience.model");

exports.getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({ createdAt: -1 }).limit(100).lean();

  res.json({
    success: true,
    experiences,
  });
});

exports.createExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.create(req.body);

  res.status(201).json({
    success: true,
    experience,
  });
});

exports.updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }

  res.json({
    success: true,
    experience,
  });
});

exports.deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }

  await experience.deleteOne();

  res.json({
    success: true,
    message: "Experience deleted successfully",
  });
});

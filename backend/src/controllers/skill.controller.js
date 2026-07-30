const asyncHandler = require("express-async-handler");
const Skill = require("../models/skill.model");

exports.getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 }).limit(100).lean();
  res.json({ success: true, skills });
});

exports.createSkill = asyncHandler(async (req, res) => {
  const { name, percent, icon, category } = req.body;

  const skill = await Skill.create({
    name,
    percent,
    icon,
    category,
  });

  res.status(201).json({ success: true, skill });
});

exports.updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }

  res.json({ success: true, skill });
});

exports.deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }

  await skill.deleteOne();

  res.json({ success: true, message: "Skill deleted successfully" });
});

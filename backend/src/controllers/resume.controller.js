const asyncHandler = require("express-async-handler");
const Resume = require("../models/resume.model");
const {
  replaceCloudinaryAsset,
  safelyDestroyAsset,
} = require("../utils/replaceCloudinaryAsset");

exports.getResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne().sort({ createdAt: -1 }).lean();

  res.json({
    success: true,
    resume,
  });
});

exports.uploadResume = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("Resume file is required");
  }

  const oldResume = await Resume.findOne();
  const resume = oldResume || new Resume();
  const previousAsset = resume.file?.toObject?.() || resume.file;
  resume.title = title?.toString().trim() || "My Resume";

  await replaceCloudinaryAsset({
    fileBuffer: req.file.buffer,
    folder: "portfolio/resume",
    previousAsset,
    resourceType: "raw",
    persistAsset: async (nextAsset) => {
      resume.file = nextAsset;
      await resume.save();
    },
  });

  res.status(201).json({
    success: true,
    message: "Resume uploaded successfully",
    resume,
  });
});

exports.deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  await resume.deleteOne();
  await safelyDestroyAsset(resume.file.public_id, undefined, "raw");

  res.json({
    success: true,
    message: "Resume deleted successfully",
  });
});

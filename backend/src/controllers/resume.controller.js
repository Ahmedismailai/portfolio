const asyncHandler = require("express-async-handler");
const Resume = require("../models/resume.model");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

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

  if (oldResume?.file?.public_id) {
    await cloudinary.uploader.destroy(oldResume.file.public_id, {
      resource_type: "raw",
    });

    await oldResume.deleteOne();
  }

  const result = await uploadToCloudinary(
    req.file.buffer,
    "portfolio/resume",
    "raw",
  );

  const resume = await Resume.create({
    title: title || "My Resume",
    file: {
      url: result.secure_url,
      public_id: result.public_id,
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

  await cloudinary.uploader.destroy(resume.file.public_id, {
    resource_type: "raw",
  });

  await resume.deleteOne();

  res.json({
    success: true,
    message: "Resume deleted successfully",
  });
});

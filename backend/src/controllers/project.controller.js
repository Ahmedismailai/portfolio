const asyncHandler = require("express-async-handler");
const Project = require("../models/project.model");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const {
  replaceCloudinaryAsset,
  safelyDestroyAsset,
} = require("../utils/replaceCloudinaryAsset");
const {
  cleanText,
  parseBoolean,
  parseTags,
} = require("../utils/contentFields");
const logActivity = require("../utils/logActivity");

exports.getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 }).limit(100).lean();
  res.json({ success: true, projects });
});

exports.createProject = asyncHandler(async (req, res) => {
  const { title, desc, tags, live, github, featured } = req.body || {};

  if (!title || !desc) {
    res.status(400);
    throw new Error("Title and description are required");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Project image is required");
  }

  const result = await uploadToCloudinary(
    req.file.buffer,
    "portfolio/projects",
    "image",
  );

  let project;
  try {
    project = await Project.create({
      title: cleanText(title),
      desc: cleanText(desc),
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      tags: parseTags(tags),
      live: cleanText(live),
      github: cleanText(github),
      featured: parseBoolean(featured),
    });
  } catch (error) {
    await safelyDestroyAsset(result.public_id);
    throw error;
  }

  await logActivity({
    action: "CREATE_PROJECT",
    module: "Project",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: project.title,
  });

  res.status(201).json({ success: true, project });
});

exports.updateProject = asyncHandler(async (req, res) => {
  const { title, desc, tags, live, github, featured } = req.body || {};

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (title !== undefined) project.title = cleanText(title);
  if (desc !== undefined) project.desc = cleanText(desc);
  if (tags !== undefined) project.tags = parseTags(tags);
  if (live !== undefined) project.live = cleanText(live);
  if (github !== undefined) project.github = cleanText(github);
  if (featured !== undefined) project.featured = parseBoolean(featured);

  if (req.file) {
    const previousAsset = project.image?.toObject?.() || project.image;
    await replaceCloudinaryAsset({
      fileBuffer: req.file.buffer,
      folder: "portfolio/projects",
      previousAsset,
      persistAsset: async (nextAsset) => {
        project.image = nextAsset;
        await project.save();
      },
    });
  } else {
    await project.save();
  }

  await logActivity({
    action: "UPDATE_PROJECT",
    module: "Project",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: project.title,
  });

  res.json({ success: true, project });
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const projectTitle = project.title;

  await project.deleteOne();
  await safelyDestroyAsset(project.image?.public_id);

  await logActivity({
    action: "DELETE_PROJECT",
    module: "Project",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: projectTitle,
  });

  res.json({ success: true, message: "Project deleted successfully" });
});

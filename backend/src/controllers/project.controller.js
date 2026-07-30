const asyncHandler = require("express-async-handler");
const Project = require("../models/project.model");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const cloudinary = require("../config/cloudinary");
const logActivity = require("../utils/logActivity");

const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;

  try {
    return JSON.parse(tags);
  } catch {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
};

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

  const project = await Project.create({
    title,
    desc,
    image: {
      url: result.secure_url,
      public_id: result.public_id,
    },
    tags: parseTags(tags),
    live,
    github,
    featured: featured === "true" || featured === true,
  });

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

  project.title = title || project.title;
  project.desc = desc || project.desc;
  project.tags = tags ? parseTags(tags) : project.tags;
  project.live = live || project.live;
  project.github = github || project.github;
  project.featured =
    featured !== undefined
      ? featured === "true" || featured === true
      : project.featured;

  if (req.file) {
    if (project.image?.public_id) {
      await cloudinary.uploader.destroy(project.image.public_id);
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "portfolio/projects",
      "image",
    );

    project.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  await project.save();

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

  if (project.image?.public_id) {
    await cloudinary.uploader.destroy(project.image.public_id);
  }

  await project.deleteOne();

  await logActivity({
    action: "DELETE_PROJECT",
    module: "Project",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: projectTitle,
  });

  res.json({ success: true, message: "Project deleted successfully" });
});

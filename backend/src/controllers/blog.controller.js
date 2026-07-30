const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const logActivity = require("../utils/logActivity");

const makeSlug = (title = "") =>
  title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

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

exports.getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(200).lean();

  res.json({
    success: true,
    blogs,
  });
});

exports.getPublishedBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ status: "published" })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  res.json({
    success: true,
    blogs,
  });
});

exports.getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    status: "published",
  }).lean();

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  res.json({
    success: true,
    blog,
  });
});

exports.createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    excerpt,
    desc,
    description,
    content,
    category,
    tags,
    featured,
    status,
  } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Blog title is required");
  }

  const finalExcerpt = excerpt || desc || description || "";
  const finalContent = content || finalExcerpt;

  if (!finalExcerpt) {
    res.status(400);
    throw new Error("Blog excerpt is required");
  }

  if (!finalContent) {
    res.status(400);
    throw new Error("Blog content is required");
  }

  const baseSlug = makeSlug(title);
  let slug = baseSlug;
  let count = 1;

  while (await Blog.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  let coverImage = {
    url: "",
    public_id: "",
  };

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "portfolio/blogs");

    coverImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const blog = await Blog.create({
    title,
    slug,
    excerpt: finalExcerpt,
    content: finalContent,
    category: category || "Web Development",
    tags: parseTags(tags),
    featured: featured === "true" || featured === true,
    status: status || "published",
    coverImage,
  });

  await logActivity({
    action: "CREATE_BLOG",
    module: "Blog",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: blog.title,
  });

  res.status(201).json({
    success: true,
    blog,
  });
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const {
    title,
    excerpt,
    desc,
    description,
    content,
    category,
    tags,
    featured,
    status,
  } = req.body;

  if (title && title !== blog.title) {
    const baseSlug = makeSlug(title);
    let slug = baseSlug;
    let count = 1;

    while (await Blog.findOne({ slug, _id: { $ne: blog._id } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    blog.title = title;
    blog.slug = slug;
  }

  blog.excerpt = excerpt || desc || description || blog.excerpt;
  blog.content = content || blog.content;
  blog.category = category || blog.category;
  blog.tags = tags ? parseTags(tags) : blog.tags;

  blog.featured =
    featured !== undefined
      ? featured === "true" || featured === true
      : blog.featured;

  blog.status = status || blog.status;

  if (req.file) {
    if (blog.coverImage?.public_id) {
      await cloudinary.uploader.destroy(blog.coverImage.public_id);
    }

    const result = await uploadToCloudinary(req.file.buffer, "portfolio/blogs");

    blog.coverImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  await blog.save();

  await logActivity({
    action: "UPDATE_BLOG",
    module: "Blog",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: blog.title,
  });

  res.json({
    success: true,
    blog,
  });
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const blogTitle = blog.title;

  if (blog.coverImage?.public_id) {
    await cloudinary.uploader.destroy(blog.coverImage.public_id);
  }

  await blog.deleteOne();

  await logActivity({
    action: "DELETE_BLOG",
    module: "Blog",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: blogTitle,
  });

  res.json({
    success: true,
    message: "Blog deleted successfully",
  });
});

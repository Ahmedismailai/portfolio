const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");
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

const makeSlug = (title = "") =>
  title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

exports.getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(200).lean();
  res.json({ success: true, blogs });
});

exports.getPublishedBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ status: "published" }).sort({ createdAt: -1 }).limit(100).lean();
  res.json({ success: true, blogs });
});

exports.getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: "published" }).lean();
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  res.json({ success: true, blog });
});

exports.createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, desc, description, content, category, tags, featured, status } = req.body;

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

  let coverImage = { url: "", public_id: "" };

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "portfolio/blogs");
    coverImage = { url: result.secure_url, public_id: result.public_id };
  }

  let blog;
  try {
    blog = await Blog.create({
      title: cleanText(title),
      slug,
      excerpt: cleanText(finalExcerpt),
      content: cleanText(finalContent),
      category: cleanText(category) || "Web Development",
      tags: parseTags(tags),
      featured: parseBoolean(featured),
      status: cleanText(status) || "published",
      coverImage,
    });
  } catch (error) {
    await safelyDestroyAsset(coverImage.public_id);
    throw error;
  }

  await logActivity({
    action: "CREATE_BLOG",
    module: "Blog",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: blog.title,
  });

  res.status(201).json({ success: true, blog });
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const { title, excerpt, desc, description, content, category, tags, featured, status } = req.body;

  if (title && title !== blog.title) {
    const baseSlug = makeSlug(title);
    let slug = baseSlug;
    let count = 1;

    while (await Blog.findOne({ slug, _id: { $ne: blog._id } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    blog.title = cleanText(title);
    blog.slug = slug;
  }

  const nextExcerpt = excerpt ?? desc ?? description;
  if (nextExcerpt !== undefined) blog.excerpt = cleanText(nextExcerpt);
  if (content !== undefined) blog.content = cleanText(content);
  if (category !== undefined) blog.category = cleanText(category);
  if (tags !== undefined) blog.tags = parseTags(tags);
  if (featured !== undefined) blog.featured = parseBoolean(featured);
  if (status !== undefined) blog.status = cleanText(status);

  if (req.file) {
    const previousAsset =
      blog.coverImage?.toObject?.() || blog.coverImage;
    await replaceCloudinaryAsset({
      fileBuffer: req.file.buffer,
      folder: "portfolio/blogs",
      previousAsset,
      persistAsset: async (nextAsset) => {
        blog.coverImage = nextAsset;
        await blog.save();
      },
    });
  } else {
    await blog.save();
  }

  await logActivity({
    action: "UPDATE_BLOG",
    module: "Blog",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: blog.title,
  });

  res.json({ success: true, blog });
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const blogTitle = blog.title;

  await blog.deleteOne();
  await safelyDestroyAsset(blog.coverImage?.public_id);

  await logActivity({
    action: "DELETE_BLOG",
    module: "Blog",
    performedBy: req.user?.name || req.user?.email || "Admin",
    details: blogTitle,
  });

  res.json({ success: true, message: "Blog deleted successfully" });
});

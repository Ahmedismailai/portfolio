const express = require("express");

const {
  getBlogs,
  getPublishedBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const { imageUpload } = require("../middleware/upload.middleware");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/published", getPublishedBlogs);
router.get("/:slug", getBlogBySlug);
router.get("/", isAuthenticated, authorizeRoles("admin"), getBlogs);

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  imageUpload.single("coverImage"),
  createBlog,
);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  imageUpload.single("coverImage"),
  updateBlog,
);

router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteBlog);

module.exports = router;

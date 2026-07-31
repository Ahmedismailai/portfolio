const express = require("express");

const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

const { imageUpload } = require("../middleware/upload.middleware");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getTestimonials);

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  imageUpload.single("image"),
  createTestimonial,
);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  imageUpload.single("image"),
  updateTestimonial,
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteTestimonial,
);

module.exports = router;

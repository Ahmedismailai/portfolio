const express = require("express");

const {
  getResume,
  uploadResume,
  deleteResume,
} = require("../controllers/resume.controller");

const { resumeUpload } = require("../middleware/upload.middleware");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getResume);

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  resumeUpload.single("resume"),
  uploadResume,
);

router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteResume);

module.exports = router;

const express = require("express");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const { imageUpload } = require("../middleware/upload.middleware");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getProjects);

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  imageUpload.single("image"),
  createProject,
);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  imageUpload.single("image"),
  updateProject,
);

router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteProject);

module.exports = router;

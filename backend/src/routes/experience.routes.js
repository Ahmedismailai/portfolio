const express = require("express");

const {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experience.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getExperiences);

router.post("/", isAuthenticated, authorizeRoles("admin"), createExperience);

router.put("/:id", isAuthenticated, authorizeRoles("admin"), updateExperience);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteExperience,
);

module.exports = router;

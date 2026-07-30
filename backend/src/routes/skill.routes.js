const express = require("express");
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skill.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getSkills);

router.post("/", isAuthenticated, authorizeRoles("admin"), createSkill);

router.put("/:id", isAuthenticated, authorizeRoles("admin"), updateSkill);

router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteSkill);

module.exports = router;

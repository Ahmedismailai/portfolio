const express = require("express");

const {
  getSettings,
  updateSettings,
} = require("../controllers/setting.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getSettings);

router.put("/", isAuthenticated, authorizeRoles("admin"), updateSettings);

module.exports = router;

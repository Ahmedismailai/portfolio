const express = require("express");

const {
  getDashboardAnalytics,
} = require("../controllers/analytics.controller");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", isAuthenticated, authorizeRoles("admin"), getDashboardAnalytics);

module.exports = router;

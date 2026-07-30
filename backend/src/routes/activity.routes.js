const express = require("express");

const {
  getActivities,
  createActivity,
} = require("../controllers/activity.controller");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.use(isAuthenticated, authorizeRoles("admin"));
router.get("/", getActivities);
router.post("/", createActivity);

module.exports = router;

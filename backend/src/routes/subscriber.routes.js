const express = require("express");

const {
  subscribe,
  getSubscribers,
  deleteSubscriber,
  exportSubscribersCSV,
} = require("../controllers/subscriber.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", subscribe);

router.get("/", isAuthenticated, authorizeRoles("admin"), getSubscribers);

router.get(
  "/export/csv",
  isAuthenticated,
  authorizeRoles("admin"),
  exportSubscribersCSV,
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteSubscriber,
);

module.exports = router;

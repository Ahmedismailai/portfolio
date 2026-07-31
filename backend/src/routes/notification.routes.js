const express = require("express");

const {
  getNotifications,
  createNotification,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} = require("../controllers/notification.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", isAuthenticated, authorizeRoles("admin"), getNotifications);

router.post("/", isAuthenticated, authorizeRoles("admin"), createNotification);

router.put(
  "/:id/read",
  isAuthenticated,
  authorizeRoles("admin"),
  markNotificationRead
);

router.put(
  "/read-all",
  isAuthenticated,
  authorizeRoles("admin"),
  markAllNotificationsRead
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteNotification
);

module.exports = router;
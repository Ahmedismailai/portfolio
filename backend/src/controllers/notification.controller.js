const asyncHandler = require("express-async-handler");
const Notification = require("../models/notification.model");

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const unread = await Notification.countDocuments({ isRead: false });

  res.json({
    success: true,
    unread,
    notifications,
  });
});

exports.createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);

  res.status(201).json({
    success: true,
    notification,
  });
});

exports.markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();

  res.json({
    success: true,
    notification,
  });
});

exports.markAllNotificationsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({}, { isRead: true });

  res.json({
    success: true,
    message: "All notifications marked as read",
  });
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  await notification.deleteOne();

  res.json({
    success: true,
    message: "Notification deleted successfully",
  });
});

const asyncHandler = require("express-async-handler");
const Subscriber = require("../models/subscriber.model");
const createNotification = require("../utils/createNotification");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const csvCell = (value = "") => {
  let text = value.toString().replace(/"/g, '""');
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text}"`;
};

exports.subscribe = asyncHandler(async (req, res) => {
  const email = req.body.email?.toString().trim().toLowerCase() || "";
  const name = req.body.name?.toString().trim().slice(0, 100) || "";

  if (!emailPattern.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }

  if (await Subscriber.exists({ email })) {
    res.status(409);
    throw new Error("Email already subscribed");
  }

  const subscriber = await Subscriber.create({ email, name });
  await createNotification({
    title: "New Subscriber",
    message: `${email} subscribed to your newsletter`,
    type: "success",
  });

  res.status(201).json({
    success: true,
    message: "Subscribed successfully",
    subscriber: { _id: subscriber._id, email: subscriber.email, name: subscriber.name },
  });
});

exports.getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 }).limit(5000).lean();
  res.json({ success: true, subscribers });
});

exports.deleteSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await Subscriber.findById(req.params.id);
  if (!subscriber) {
    res.status(404);
    throw new Error("Subscriber not found");
  }

  await subscriber.deleteOne();
  res.json({ success: true, message: "Subscriber deleted successfully" });
});

exports.exportSubscribersCSV = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 }).lean();
  const rows = subscribers.map((item) =>
    [item.name, item.email, item.source, item.createdAt.toISOString()].map(csvCell).join(","),
  );
  const csv = ["Name,Email,Source,Date", ...rows].join("\n");

  res.header("Content-Type", "text/csv; charset=utf-8");
  res.attachment("subscribers.csv");
  res.send(`\uFEFF${csv}`);
});

const asyncHandler = require("express-async-handler");
const WorkWith = require("../models/workWith.model");

const defaults = { title: "I work with", badge: "Modern Stack", items: [] };

exports.getWorkWith = asyncHandler(async (req, res) => {
  const data = (await WorkWith.findOne().lean()) || defaults;
  res.json(data);
});

exports.updateWorkWith = asyncHandler(async (req, res) => {
  let data = await WorkWith.findOne();
  if (!data) data = new WorkWith(defaults);

  if (req.body.title !== undefined) data.title = req.body.title.toString().trim();
  if (req.body.badge !== undefined) data.badge = req.body.badge.toString().trim();
  if (Array.isArray(req.body.items)) data.items = req.body.items;

  await data.save();
  res.json(data);
});

exports.addWorkWithItem = asyncHandler(async (req, res) => {
  const name = req.body.name?.toString().trim();
  if (!name) {
    res.status(400);
    throw new Error("Item name is required");
  }

  let data = await WorkWith.findOne();
  if (!data) data = new WorkWith(defaults);

  data.items.push({
    name: name.slice(0, 80),
    icon: req.body.icon?.toString().trim() || "FaReact",
    color: req.body.color?.toString().trim() || "text-cyan-400",
  });
  await data.save();
  res.status(201).json(data);
});

exports.updateWorkWithItem = asyncHandler(async (req, res) => {
  const data = await WorkWith.findOne();
  if (!data) {
    res.status(404);
    throw new Error("WorkWith data not found");
  }

  const item = data.items.id(req.params.itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  for (const field of ["name", "icon", "color"]) {
    if (req.body[field] !== undefined) item[field] = req.body[field].toString().trim();
  }

  await data.save();
  res.json(data);
});

exports.deleteWorkWithItem = asyncHandler(async (req, res) => {
  const data = await WorkWith.findOne();
  if (!data) {
    res.status(404);
    throw new Error("WorkWith data not found");
  }

  const originalLength = data.items.length;
  data.items = data.items.filter((item) => item._id.toString() !== req.params.itemId);

  if (data.items.length === originalLength) {
    res.status(404);
    throw new Error("Item not found");
  }

  await data.save();
  res.json({ success: true, message: "Item deleted successfully", data });
});

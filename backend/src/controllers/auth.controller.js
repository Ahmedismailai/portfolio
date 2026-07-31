const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const sendToken = require("../utils/sendToken");
const {
  replaceCloudinaryAsset,
} = require("../utils/replaceCloudinaryAsset");

const normalizeEmail = (email = "") => email.toString().trim().toLowerCase();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.registerAdmin = asyncHandler(async (req, res) => {
  const name = req.body.name?.toString().trim();
  const email = normalizeEmail(req.body.email);
  const password = req.body.password?.toString() || "";

  if (!name || !emailPattern.test(email) || password.length < 8) {
    res.status(400);
    throw new Error("Name, a valid email, and a password of at least 8 characters are required");
  }

  if (await User.exists({ email })) {
    res.status(409);
    throw new Error("Admin already exists");
  }

  const user = await User.create({ name: name.slice(0, 80), email, password, role: "admin" });
  sendToken(user, 201, res);
});

exports.loginAdmin = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = req.body.password?.toString() || "";

  if (!emailPattern.test(email) || !password) {
    res.status(400);
    throw new Error("Please enter a valid email and password");
  }

  const user = await User.findOne({ email }).select("+password");
  const isMatch = user ? await user.comparePassword(password) : false;

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  sendToken(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

exports.logout = asyncHandler(async (req, res) => {
  sendToken.clear(res);
  res.json({ success: true, message: "Logged out successfully" });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (req.body.name) user.name = req.body.name.toString().trim().slice(0, 80);

  if (req.body.email) {
    const email = normalizeEmail(req.body.email);
    if (!emailPattern.test(email)) {
      res.status(400);
      throw new Error("Please enter a valid email");
    }
    user.email = email;
  }

  const currentLinks = user.socialLinks?.toObject?.() || user.socialLinks || {};
  user.socialLinks = {
    ...currentLinks,
    ...Object.fromEntries(
      ["github", "linkedin", "twitter", "instagram", "facebook"]
        .filter((key) => req.body[key] !== undefined)
        .map((key) => [key, req.body[key].toString().trim()]),
    ),
  };

  if (req.file) {
    const previousAsset = user.avatar?.toObject?.() || user.avatar;
    await replaceCloudinaryAsset({
      fileBuffer: req.file.buffer,
      folder: "portfolio/avatar",
      previousAsset,
      persistAsset: async (nextAsset) => {
        user.avatar = nextAsset;
        await user.save();
      },
    });
  } else {
    await user.save();
  }

  res.json({ success: true, message: "Profile updated successfully", user });
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const oldPassword = req.body.oldPassword?.toString() || "";
  const newPassword = req.body.newPassword?.toString() || "";

  if (!oldPassword || newPassword.length < 8) {
    res.status(400);
    throw new Error("Old password and a new password of at least 8 characters are required");
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user || !(await user.comparePassword(oldPassword))) {
    res.status(400);
    throw new Error("Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

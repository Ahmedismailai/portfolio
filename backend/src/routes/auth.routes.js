const express = require("express");

const {
  registerAdmin,
  loginAdmin,
  getMe,
  logout,
  updateProfile,
  updatePassword,
} = require("../controllers/auth.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post(
  "/register",
  isAuthenticated,
  authorizeRoles("admin"),
  registerAdmin,
);
router.post("/login", loginAdmin);
router.get("/me", isAuthenticated, getMe);
router.post("/logout", logout);

router.put(
  "/profile",
  isAuthenticated,
  authorizeRoles("admin"),
  upload.single("avatar"),
  updateProfile,
);

router.put(
  "/password",
  isAuthenticated,
  authorizeRoles("admin"),
  updatePassword,
);

module.exports = router;

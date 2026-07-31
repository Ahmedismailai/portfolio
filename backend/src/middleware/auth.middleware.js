const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { getJwtSecret } = require("../config/auth");

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token;
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Please log in to access this resource");
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      throw new Error("The account for this session no longer exists");
    }

    req.user = user;
    next();
  } catch {
    res.status(401);
    throw new Error("Session is invalid or expired");
  }
});

exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    res.status(403);
    throw new Error("Role is not allowed");
  }

  next();
};

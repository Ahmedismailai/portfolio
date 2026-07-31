const express = require("express");

const {
  getWorkWith,
  updateWorkWith,
  addWorkWithItem,
  updateWorkWithItem,
  deleteWorkWithItem,
} = require("../controllers/workWith.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getWorkWith);

router.put("/", isAuthenticated, authorizeRoles("admin"), updateWorkWith);

router.post("/item", isAuthenticated, authorizeRoles("admin"), addWorkWithItem);

router.put(
  "/item/:itemId",
  isAuthenticated,
  authorizeRoles("admin"),
  updateWorkWithItem,
);

router.delete(
  "/item/:itemId",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteWorkWithItem,
);

module.exports = router;

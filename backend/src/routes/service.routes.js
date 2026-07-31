const express = require("express");

const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getServices);

router.post("/", isAuthenticated, authorizeRoles("admin"), createService);

router.put("/:id", isAuthenticated, authorizeRoles("admin"), updateService);

router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteService);

module.exports = router;

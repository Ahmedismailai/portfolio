const express = require("express");

const { getSEO, updateSEO } = require("../controllers/seo.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getSEO);

router.put("/", isAuthenticated, authorizeRoles("admin"), updateSEO);

module.exports = router;

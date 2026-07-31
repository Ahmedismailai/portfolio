const express = require("express");

const {
  sendContactMessage,
  getContactMessages,
  deleteContactMessage,
} = require("../controllers/contact.controller");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/", sendContactMessage);


router.get("/", isAuthenticated, authorizeRoles("admin"), getContactMessages);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteContactMessage,
);

module.exports = router;

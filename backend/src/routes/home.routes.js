const express = require("express");
const { getHomeData } = require("../controllers/home.controller");

const router = express.Router();

router.get("/", getHomeData);

module.exports = router;

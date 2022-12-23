const express = require("express");
const { getObj } = require("../controllers/test.controllers");

const router = express.Router();

router.get("/", getObj);

module.exports = router;

const express = require("express");
const router = express.Router();
const { addBed, getBeds } = require("../controllers/bedController");

router.post("/add", addBed);
router.get("/", getBeds);

module.exports = router;

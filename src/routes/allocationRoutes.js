const express = require("express");
const router = express.Router();

// ✅ Import the controller
const allocateController = require("../controllers/allocationController");

// Routes
router.post("/add", allocateController.allocateBed);

module.exports = router;

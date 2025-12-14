const express = require("express");
const router = express.Router();
const {
  addHospital,
  getHospitals,
} = require("../controllers/hospitalController");

router.post("/add", addHospital);
router.get("/", getHospitals);

module.exports = router;

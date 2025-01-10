const express = require("express");
const { getAllCars, getCarById } = require("../controllers/carController");

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);

module.exports = router;
const express = require("express");
const { addReview, getCarReviews, deleteReview } = require("../controllers/reviewController");
const verifyToken = require("./controllers/verifyToken"); // Imported to verifyToken middleware

const router = express.Router();

// Route to add a review (authentication required)
router.post("/", verifyToken, addReview);

// Route to get reviews for a specific car
router.get("/:carId", getCarReviews);

// Route to delete a review (authentication required)
router.delete("/:id", verifyToken, deleteReview);

module.exports = router;
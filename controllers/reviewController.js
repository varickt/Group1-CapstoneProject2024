const prisma = require('../prisma/prismaClient');
const verifyToken = require('../controllers/verifyToken');  // Import the middleware

// Function to add a review with user authentication
const addReview = async (req, res) => {
  const { carId, content, rating } = req.body;
  const userId = req.user.userId;  // Extract userId from the decoded JWT token

  try {
    // Create the review and link it to the authenticated user
    const review = await prisma.review.create({
      data: {
        carId: parseInt(carId),  // Make sure carId is an integer
        content,
        rating,
        userId: userId,  // Link the review to the authenticated user
      },
    });
    res.status(201).json(review);  // Return the created review
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add review", details: error.message });
  }
};

// Function to get reviews for a specific car
const getCarReviews = async (req, res) => {
  const { carId } = req.params;

  try {
    // Fetch car details with its reviews
    const car = await prisma.car.findUnique({
      where: { id: parseInt(carId) },
      include: { reviews: true }, // Include reviews along with the car details
    });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(car); // Return the car with its reviews
  } catch (error) {
    res.status(500).json({ error: "Failed to get car details" });
  }
};

// Function to delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Review deleted", deletedReview });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};

module.exports = { addReview, getCarReviews, deleteReview };
const prisma = require('../prisma/prismaClient');

// Fetch all cars with their reviews
const getAllCars = async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      include: {
        reviews: true,  // Include the reviews for each car
      },
    });

    res.status(200).json(cars);  // Return cars with reviews
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

// Fetch car details by ID
const getCarById = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await prisma.car.findUnique({
      where: { id: parseInt(id) },
      include: {
        reviews: true,  // Include the reviews for the car
      },
    });

    if (!car) return res.status(404).json({ error: "Car not found" });

    res.status(200).json(car);  // Return car with reviews
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch car details" });
  }
};

module.exports = { getAllCars, getCarById };
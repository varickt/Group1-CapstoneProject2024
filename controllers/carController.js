const prisma = require('../prisma/prismaClient');

const getAllCars = async (req, res) => {
  try {
    const cars = await prisma.car.findMany();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

const getCarById = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await prisma.car.findUnique({ where: { id: parseInt(id) } });
    if (!car) return res.status(404).json({ error: "Car not found" });

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch car details" });
  }
};

module.exports = { getAllCars, getCarById };
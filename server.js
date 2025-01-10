require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/cars", carRoutes);
app.use("/reviews", reviewRoutes);

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
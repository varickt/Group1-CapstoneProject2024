const express = require("express");
const { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword 
} = require("../controllers/userController");

const router = express.Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route
router.post("/reset-password", resetPassword);

module.exports = router;
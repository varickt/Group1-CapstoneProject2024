const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaClient");

// Import the mock email service
const mockSendResetEmail = require("./mockEmailService");

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_SECRET = process.env.EMAIL_SECRET;

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign({ userId: user.id }, EMAIL_SECRET, { expiresIn: "15m" });

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    // Use the mock function to simulate sending the email
    await mockSendResetEmail(email, "Password Reset Request", `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ error: "Failed to send reset email" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, EMAIL_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { protect } from "../middleware/authMiddleware";
import { ENV } from "../config/env";

const router = express.Router();

// Generate JWT
const generateToken = (id: string): string => {
  const payload: { id: string } = { id };

  return (jwt.sign as any)(
  { id },
  ENV.JWT_SECRET,
  { expiresIn: ENV.JWT_EXPIRES_IN }
);
};

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// PROTECTED ROUTE
router.get("/me", protect, async (req: any, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

export default router;

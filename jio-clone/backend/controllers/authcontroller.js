import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("Received signup request:", req.body); // ✅ Log request data

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log("❌ Missing fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log("❌ User already exists");
    return res.status(400).json({ message: "User already exists, Redirecting to login", redirect: "/login"  });
  }

  console.log("✅ User does not exist. Proceeding with hashing...");
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("✅ Hashed password created");
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  console.log("✅ User saved to database");

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Login successful", token });
};

export const logout = (req, res) => {
  res.cookie("authToken", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

// 📁 routes/auth.js

const express = require("express");
const User = require("../models/User");

const router = express.Router();

// --- SIGNUP Route ---
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("📥 Incoming signup:", username, email);

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log("✅ User saved:", newUser.username);
    res.status(201).json({
      message: "Signup successful",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage || ""  // Include profileImage in response
      }
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- LOGIN Route ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("➡️ Login attempt:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Invalid email");
      return res.status(400).json({ message: "Invalid email" });
    }

    if (user.password !== password) {
      console.log("❌ Passwords do not match");
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("✅ Login successful for:", user.username);

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage || ""
      }
    });

  } catch (err) {
    console.error("❌ Server error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

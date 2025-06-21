const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");

const router = express.Router();

// Ensure uploads/profiles exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "..", "uploads", "profiles");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles"); // Ensure this path exists
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/**
 * PATCH /api/profile/update-profile-image/:userId
 * Updates profile image
 */
router.patch("/update-profile-image/:userId", upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Ensure the image path always starts with a forward slash
    const imagePath = `/uploads/profiles/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imagePath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile image updated",
      profileImage: updatedUser.profileImage,
    });
  } catch (err) {
    console.error("Error uploading profile image:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/profile/:userId
 * Fetch user profile info (username, email, profileImage)
 */
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("username email profileImage");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

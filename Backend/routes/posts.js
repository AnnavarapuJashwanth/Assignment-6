const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');

// Save post images to /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Create a new post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { userId, caption } = req.body;

    if (!req.file || !userId || !caption) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const post = new Post({ userId, caption, imageUrl });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all posts (with user info)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'username profileImage'); // ✅ Includes profile image

    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get posts by user
router.get('/user/:id', async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .populate('userId', 'username profileImage');

    res.json(posts);
  } catch (err) {
    console.error('Error fetching user posts:', err.message);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

module.exports = router;

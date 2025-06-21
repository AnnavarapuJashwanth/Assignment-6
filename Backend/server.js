require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const profileRoutes = require('./routes/profile');
const chatRoutes = require('./routes/chat');

const app = express();

// ✅ Middleware first
app.use(cors());
app.use(express.json());

// ✅ Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Register routes AFTER middleware
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/chat', chatRoutes); // <-- moved here after middleware

// Debug connection string
console.log("Mongo URI:", process.env.MONGO_URI);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on port", process.env.PORT || 5000);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

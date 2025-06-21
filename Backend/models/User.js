const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
 profileImage: {
  type: String,
  default: '/uploads/profiles/default-profile.png' // ✅ correct path
}

});

module.exports = mongoose.model("User", UserSchema, "User");

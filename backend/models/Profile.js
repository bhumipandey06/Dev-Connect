// backend/models/Profile.js

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  github: String,
  linkedin: String,
  portfolio: String,
  techStack: [String],
  profileImage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  label: {
    type: String,
    required: false, // ← change this
    default: "",     // ← optional
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

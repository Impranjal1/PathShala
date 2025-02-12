import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['student', 'coaching'],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  profile: {
    name: String,
    phone: String,
    address: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
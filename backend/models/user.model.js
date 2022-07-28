const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false
  },
  bio: {
    type: String,
    required: false,
    trim: true
  },
  favorites: {
    type: Number,
    default: 0,
  },
  games: {
    type: Number,
    default: 0
  }
}, 
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
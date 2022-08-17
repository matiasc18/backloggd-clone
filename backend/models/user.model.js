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
  // Users bio info
  bio: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  // Users list of games (game_id)
  games: {
    type: [Number],
    required: true,
    default: []
  },
  // Users list of favorites (game_id)
  favorites: {
    type: [Number],
    required: true,
    default: []
  },
  totalGames: {
    type: Number,
    default: 0,
    required: false
  },
  totalFavorites: {
    type: Number,
    default: 0,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
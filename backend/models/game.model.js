const { urlencoded } = require('express');
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Game', gameSchema);
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  games: [
    {
      id: {
        type: Number,
      },
      title: {
        type: String,
      },
      genre: {
        type: String,
      },
      releaseDate: {
        type: Date,
      },
      cover: {
        type: String,
      },
      rating: {
        type: Number,
      }
    },
    {
      required: true
    }
  ]
});

module.exports = mongoose.model('Game', gameSchema);
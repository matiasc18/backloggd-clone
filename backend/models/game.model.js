const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  games: [
    {
      id: {
        unique: true,
        type: Number,
        required: true
      },
      name: {
        type: String,
      },
      genres: [
        {
          name: {
            type: String,
          }
        }
      ],
      first_release_date: {
        type: Date,
      },
      cover: {
        image_id: {
          type: String
        }
      },
      rating: {
        type: Number,
      }
    },
    { required: true }
  ],
  favorites: [
    {
      id: {
        type: Number,
      },
      name: {
        type: String,
      },
      genres: [
        {
          name: {
            type: String
          }
        }
      ],
      first_release_date: {
        type: Date,
      },
      cover: {
        image_id: {
          type: String
        }
      },
      rating: {
        type: Number,
      }
    },
  ]
});

module.exports = mongoose.model('Game', gameSchema);
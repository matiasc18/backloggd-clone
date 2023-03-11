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
  games: [
    {
      id: Number,
      status: {
        minsPlayed: Number, // in minutes
        completionStatus: Number, // 1: played, 2: completed, 3: retired, 4: shelved, 5: abandoned
        gameStatus: Number, // 1: played, 2: playing, 3: backlog, 4: wishlist
        library: [
          {
            platform: Number,
            ownership: Number, // 1: physical, 2: digital, 3: lost/lost
          }
        ],
      log: [
        {
          rating: Number,
          platform: Number,
          startDate: Date,
          finishDate: Date,
          review: String,
          spoilerWarning: Boolean,
          advanced: {
            medium: Number, // 1: owned, 2: subscription, 3: borrowed, 4: watched
            minsPlayed: Number, // in minutes
            mastered: Boolean,
            replay: Boolean,
            logTitle: {
              type: String,
              default: 'Log'
            }
          }
        }
      ],

        id: Number,
        developed: [Number],
        name: String,
        websites: [
          {
            id: Number,
            url: String
          }
        ]
      }
    }
  ],
  // games: {
  //   type: [Number],
  //   required: true,
  //   default: []
  // }
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
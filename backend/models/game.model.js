const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  game_id: Number,
  age_ratings: {
    id: Number,
    category: Number,
    rating: Number,
    rating_cover_url: String
  },
  aggregated_rating: Number,
  aggregated_rating_count: Number,
  artworks: {
    id: Number,
    width: Number,
    height: Number,
    image_id: String
  },
  category: Number,
  cover: {
    id: Number,
    image_id: String
  },
  dlcs: [Number],
  expanded_games: [Number],
  expansions: [Number],
  external_games: {
    id: Number,
    category: Number,
    url: String
  },
  first_release_date: Date,
  follows: Number,
  franchise: {
    id: Number,
    name: String
  },
  game_collection: {
    id: Number,
    name: String
  },
  game_modes: [
    {
      id: Number,
      name: String,
      slug: String
    }
  ],
  genres: [
    {
      id: Number,
      name: String
    }
  ],
  hypes: Number,
  involved_companies: [
    {
      developer: Boolean,
      company: {
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
  local_date: String,
  name: String,
  parent_game: Number,
  platforms: {
    id: Number,
    name: String,
    platform_logo: {
      image_id: String
    }
  },
  rating: Number,
  rating_count: Number,
  screenshots: [
    {
      id: Number,
      image_id: String
    }
  ],
  similar_games: [Number],
  slug: String,
  status: Number,
  storyline: String,
  summary: String,
  tags: [Number],
  total_rating: Number,
  total_rating_count: Number,
  version_parent: Number,
  videos: {
    id: Number,
    video_id: String
  },
  websites: [
    {
      id: Number,
      category: Number,
      url: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
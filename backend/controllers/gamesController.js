const Game = require('../models/game.model');
const User = require('../models/user.model');
const axios = require('axios');
const jwt = require('jsonwebtoken');

//? @desc       Get games list from IGDB
//? @route      POST /games/
//? @access     Public
const getGames = async (req, res) => {

  //* Default config for reguesting to IGDB
  //? Default filter = trending games (via req.body.queryString)
  const config = {
    method: 'post',
    url: '/games',
    baseURL: process.env.IGDB_URI,
    headers: {
      'Accept': 'application/json',
      'Client-ID': process.env.IGDB_CLIENT_ID,
      'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`
    },
    responseType: 'json',
    timeout: 10000, // 10 second timeout (1 second = too short)
    data: req.body.queryString
  };

  // Return list of all games + total game count
  try {
    const gamesResponse = await axios.request(config);
    const countResponse = await axios.request({...config, url: '/games/count', data: `${req.body.query.filter};`});

    return res.json({totalCount: countResponse.data.count, results: gamesResponse.data});
  } catch(err) {
    return res.status(400).json(err);
  }
};

//? @desc       Add game(s) to a user
//? @route      POST /games/add
//? @access     Private
const addUserGames = async (req, res) => {
  const games = req.body;
  
  if (games) {
    try {
      const userGames = await Game.findOne({ user: req.user.id});

      for (let i = 0; i < games.length; i++) {
        await userGames.updateOne(
          { $push: 
            { games: {
                id: games[i].id,
                name: games[i].name,
                genres: games[i].genres,
                first_release_date: new Date(games[i].first_release_date * 1000),
                cover: games[i].cover,
                rating: Math.ceil(games[i].rating)
            }
          }
        });
      }

      // Update the user's total game count
      await User.updateOne(
        { _id: req.user.id },
        { $inc: { games: games.length }}
      );

      const message = (games.length === 1) ? 
        `1 game successfully added to ${req.user.username}'s backlog!` 
          : `${games.length} games successfully added to ${req.user.username}'s backlog!`;
    
      return res.status(200).json({ message: message });
    } catch(err) {
        return res.status(400).json({ error: err });
    }
  }
  return res.status(400).json({ error: 'No body received' });
};

//? @desc       Get user's games
//? @route      GET /games/backlog/all
//? @access     Private
const getUserGames = async (req, res) => {
  try {
    const user = await Game.findOne({ user: req.user.id });
    return res.status(200).json(user.games);
  } catch(err) {
      return res.status(404).json({ err: err.message });
  }
};

//? @desc       Get user's favorite games
//? @route      GET /games/backlog/favorites
//? @access     Private
const getFavorites = async (req, res) => {
  try {
    const user = await Game.findOne({ user: req.user.id });
    return res.status(200).json(user.favorites);
  } catch(err) {
      return res.status(404).json({err: err.message });
  }
};

//? @desc       Add game(s) to a user
//? @route      POST /games/add
//? @access     Private
const addFavorite = async (req, res) => {
  const { game } = req.body;
  
  if (game) {
    try {
      const userFavorites = await Game.findOne({ user: req.user.id }).updateOne(
        { $push: 
          { favorites: {
              id: game.id,
              name: game.name,
              genres: game.genres,
              first_release_date: new Date(game.first_release_date * 1000),
              cover: game.cover,
              rating: Math.ceil(game.rating)
            }
          }
        });

      // Update the user's total game count
      await User.updateOne(
        { _id: req.user.id },
        { $inc: { favorites: 1 }}
      );
    
      return res.status(200).json({ message: `${req.user.username} added ${game.name} to their favorites!` });
    } catch(err) {
        return res.status(400).json({ error: err.message });
    }
  }
  return res.status(400).json({error: 'No body received'});

};

module.exports = {
  getGames,
  addUserGames,
  getUserGames,
  getFavorites,
  addFavorite
}
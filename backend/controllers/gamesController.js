const Game = require('../models/game.model');
const User = require('../models/user.model');
const axios = require('axios');

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
const addUserGame = async (req, res) => {
  // invalid (default): ''
  // valid: [{ id, title, genre, releaseDate, cover, rating }]
  const { games } = req.body;
  const gamesCount = req.user.gamesCount;
  
  if (games) {
    try {
      // Create the user's game list
      if (gamesCount === 0) {
        await Game.create({
          user: req.user._id ,
          games: [
            {
              id: games[0].id,
              title: games[0].title,
              genre: games[0].genre,
              releaseDate: games[0].releaseDate,
              cover: games[0].cover,
              rating: games[0].rating
            }
          ]
        });

        // Add remaining games (if there are more games to add)
        if (games.length > 1)
          addGames(games, 1, req.user._id);
      // Update the users game list
      } else {
        addGames(games, 0, req.user._id);
      }

      // Update the user's total game count
      await User.updateOne(
        { _id: req.user._id },
        { $inc: { gamesCount: games.length }}
      );

      const message = (games.length === 1) ? 
        `1 game successfully added to ${req.user.username}'s backlog!` 
          : `${games.length } games successfully added to ${req.user.username}'s backlog!`;
    
      return res.status(200).json({ message: message });
    } catch(err) {
        return res.status(400).json({error: err});
    }
  }
  return res.status(400).json({error: 'No body received'});
};

// Adds all selected games to user's collection
const addGames = async (games, startIndex, userId) => {
  for (let i = startIndex; i < games.length; i++) {
    await Game.find({ user: userId }).update(
      { $push: 
        { games: {
          id: games[i].id,
          title: games[i].title,
          genre: games[i].genre,
          releaseDate: games[i].releaseDate,
          cover: games[i].cover,
          rating: games[i].rating
        }
      }
    });
  }
}

module.exports = {
  getGames,
  addUserGame
}
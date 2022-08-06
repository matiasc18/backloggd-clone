const Game = require('../models/game.model');
const User = require('../models/user.model');
const igdb = require('../axios');
const jwt = require('jsonwebtoken');

//? @desc       Get games list from IGDB
//? @route      POST /games/
//? @access     Public
const getGames = async (req, res) => {
  const query = req.body.query;

  //* Default config for reguesting to IGDB
  const config = {
    url: '/games',
    baseURL: process.env.IGDB_URI,
    data: req.body.queryString
  };

  // Return list of all games + total game count
  try {
    // Get first 500 games + count of how many games
    let games = (await igdb.request(config)).data;
    const totalGames = (await igdb.request({ ...config, url: '/games/count', data: `${req.body.query.filter};` })).data.count;
    let total = totalGames;
    
    // If there are more than 500 games with the current filter...
    if (total > 500) {
      // Make request for more games (index 501-1000, 1001-1500, etc.) and append to original games response
      while (total > 500) {
        query.page++;
        config.data = queryBuilder(query).queryString;
        games = games.concat((await igdb.request(config)).data);
        total -= 500;
      }
    }

    return res.status(200).json({ totalCount: totalGames, results: games });
  } catch (err) {
    return res.status(400).json(err);
  }
};

//? @desc       Get games deatils from IGDB
//? @route      GET /games/
//? @access     Public
const getGameDetails = async (req, res) => {
  const config = {
    url: '/games',
    data: `fields name, cover.image_id, rating, first_release_date, genres.name, screenshots.image_id, summary; where id = ${req.params.id};`
  };

  // Return list of all games + total game count
  try {
    const response = await igdb.request(config);

    response.data[0].dateLocal = new Date(response.data[0].first_release_date * 1000)
      .toLocaleDateString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'short'
      });

    return res.status(200).json(response.data[0]);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//? @desc       Add game(s) to a user
//? @route      POST /games/add
//? @access     Private
const addUserGames = async (req, res) => {
  const { games } = req.body;

  if (games) {
    try {
      const userGames = await Game.findOne({ user: req.user.id });

      for (let i = 0; i < games.length; i++) {
        if (userGames.games.some(game => game.id === games[i].id)) {
          return res.json({message: 'Game already added'});
        }

        await userGames.updateOne(
          {
            $push:
            {
              games: {
                id: games[i].id,
                name: games[i].name,
                genres: games[i].genres,
                first_release_date: new Date(games[i].first_release_date * 1000),
                cover: games[i].cover,
                rating: Math.ceil(games[i].rating),
              }
            }
          });
      }

      // Update the user's total game count
      await User.updateOne(
        { _id: req.user.id },
        { $inc: { games: games.length } }
      );

      const message = (games.length === 1) ?
        `1 game successfully added to ${req.user.username}'s backlog!`
        : `${games.length} games successfully added to ${req.user.username}'s backlog!`;

      return res.status(200).json({ message: message, games: userGames });
    } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    return res.status(404).json({ err: err.message });
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
        {
          $push:
          {
            favorites: {
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
        { $inc: { favorites: 1 } }
      );

      return res.status(200).json({ message: `${req.user.username} added ${game.name} to their favorites!` });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  return res.status(400).json({ error: 'No body received' });
};

// ? IGDB query buiilder
// ? Takes in query object and constructs IGDB query string
const queryBuilder = (query) => {
  let qs = `fields ${query.fields}; limit ${query.limit}; `;
  qs += `${(query.filter !== 'where ') ? query.filter + '; ' : ''}`;
  qs += `${(query.sort !== 'sort ') ? query.sort + '; ' : ''}`;
  qs += `${(query.page !== 1) ? 'offset ' + ((query.page - 1) * query.limit) + '; ' : ''}`;
  qs += `${(query.search.trim() !== '') ? 'search "' + query.search.trim() + '";' : ''}`;

  // console.log(qs);
  const finalQuery = { query: query, queryString: qs.trim() };
  return finalQuery;
};

module.exports = {
  getGames,
  addUserGames,
  getUserGames,
  getFavorites,
  addFavorite,
  getGameDetails
}
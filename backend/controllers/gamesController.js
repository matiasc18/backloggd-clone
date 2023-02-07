const Games = require('../models/game.model');
const igdb = require('../igdb');

//? @desc       Get games list from IGDB
//? @route      POST /games/
//? @access     Public
//TODO Change to work with MongoDB instead of IGDB
const getGames = async (req, res) => {
  const query = req.body.query;

  //* Default config for reguesting to IGDB
  const config = {
    url: '/games',
    data: req.body.queryString
  };

  // Return list of all games + total game count
  try {
    // Get first 500 games + count of how many games
    const games = await igdb.request(config);
    let totalGames;
    if (query.limit > 10) {
      totalGames = (await igdb.request({ ...config, url: '/games/count', data: `${query.filter !== '' ? 'where ' + query.filter + ';' : ''};` })).data.count;
      // const totalGames = (await igdb.request({ ...config, url: '/games/count', data: `${query.filter}`})).data.count;

      let total = totalGames;
      // If there are more than 500 games with the current filter...
      if (total > 500) {
        // Make request for more games (index 501-1000, 1001-1500, etc.) and append to original games response
        while (total > 500) {
          query.page++;
          config.data = queryBuilder(query).queryString;
          games.data = games.data.concat((await igdb.request(config)).data);
          total -= 500;
        }
      }
    }
    else totalGames = query.limit;

    return res.status(200).json({ totalGames: totalGames, results: games.data });
  } catch (err) {
    return res.status(400).json(err);
  }
};

//? @desc       Get games deatils from IGDB
//? @route      GET /games/:id
//? @access     Public
const getGameDetails = async (req, res) => {
  const config = {
    url: '/games',
    data: `fields name, cover.image_id, rating, first_release_date, genres.name, screenshots.image_id, summary, involved_companies.company.name, involved_companies.developer, platforms.name; where id = ${req.params.id};`
  };

  // Return list of all games + total game count
  try {
    const response = await igdb.request(config);

    // Format release date i.e. April 20, 2020
    response.data[0].local_date = new Date(response.data[0].first_release_date * 1000)
      .toLocaleDateString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'short'
      });

    // Only keep companies that are developers
    response.data[0].involved_companies = response.data[0].involved_companies.filter(company => {
      return company.developer === true
    });

    return res.status(200).json(response.data[0]);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//? @desc       Search for a game in IGDB
//? @route      GET /games/search/:name
//? @access     Public
const searchGames = async (req, res) => {
  const name = req.params.name.replaceAll('-', ' ');

  const config = {
    url: '/games',
    data: `fields name, cover.image_id, rating; search "${name}"; limit 500; where name != null & rating != null & cover != null;`
  };

  try {
    const games = await igdb.request(config);
    return res.status(200).json({ totalGames: games.data.length, results: games.data });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};

// ? IGDB query buiilder
// ? Takes in query object and constructs IGDB query string
const queryBuilder = (query) => {
  let qs = `fields ${query.fields}; limit ${query.limit}; `;
  qs += `${(query.filter !== '') ? 'where ' + query.filter + '; ' : ''}`;
  qs += `${(query.sort !== '') ? 'sort ' + query.sort + '; ' : ''}`;
  qs += `${(query.page !== 1) ? 'offset ' + ((query.page - 1) * query.limit) + '; ' : ''}`;
  qs += `${(query.search.trim() !== '') ? 'search "' + query.search.trim() + '";' : ''}`;

  // console.log(qs);
  const finalQuery = { query: query, queryString: qs.trim() };
  return finalQuery;
};


module.exports = {
  getGames,
  getGameDetails,
  searchGames
}

//? Clone, create, update, and delete IGDB functions
// //? @desc       Clones IGDB into Frontloggd MongoDB
// //? @route      POST /games/clone-igdb
// //? @access     Admin
// const cloneIGDB = async (req, res) => {
//   const { query, queryString } = req.body;

//   // Axios config for IGDB
//   const config = {
//     url: '/games',
//     data: queryString
//   };

//   // Requests 500 games at a time until all games copied
//   try {
//     // Get initial 500 games
//     const games = await igdb.request(config);
//     let totalGames = (await igdb.request({ ...config, url: '/games/count', data: '' })).data.count;

//     let gamesLength = 0;
//     let failedGames = 0;
//     console.log('Total games to copy: ', totalGames);
//     console.log('gamesLength: ', gamesLength);

//     while (gamesLength < totalGames) {
//       console.log('Modifying...');

//       let gamesAdded = 0;
//       for (let i = 0; i < games.data.length; i++) {
//         // Rename each game's 'id' to 'game_id'
//         delete Object.assign(games.data[i], { 'game_id': games.data[i].id })['id'];

//         // Adjust game's release date + add human date string
//         if (games.data[i].first_release_date !== undefined) {
//           games.data[i].first_release_date = new Date(games.data[i].first_release_date) * 1000;
//           games.data[i].local_date = new Date(games.data[i].first_release_date)
//             .toLocaleDateString('en-US', {
//               day: 'numeric',
//               year: 'numeric',
//               month: 'short'
//             });
//         }

//         // Rename 'collection' to 'gameCollection'
//         // (mongoDB doesn't allow 'collection' as a field name)
//         if (games.data[i].collection != undefined) {
//           delete Object.assign(games.data[i], { 'game_collection': games.data[i].collection })['collection'];
//         }

//         // Create and add the game, check for failed games
//         const game = await Games.create(games.data[i]);
//         if (game == undefined) {
//           console.log('Failed to create game: ', games.data[i].name);
//           failedGames++;
//         }
//         else
//           gamesAdded++;
//       }

//       console.log('Added page => {\nGames added: ', gamesAdded);
//       gamesLength += gamesAdded;
//       console.log('gamesLength: ', gamesLength);
//       query.page++;
//       config.data = queryBuilder(query).queryString;
//       console.log('Games left: ', totalGames - gamesLength);
//       console.log('};\nLoading next page...');
//       games.data = (await igdb.request(config)).data;
//       totalGames = (await igdb.request({ ...config, url: '/games/count', data: '' })).data.count;
//     }

//     console.log('made it!\ntotalGames: ', totalGames);
//     console.log('gamesLength: ', gamesLength);
//     console.log('failed games: ', failedGames);
//     return res.status(200).json({ totalGames: totalGames, gamesLength: gamesLength, gamesFailed: failedGames });
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// };

// //? @desc       Adds newly added IGDB games into Frontloggd MongoDB
// //? @route      POST /games/create-igdb
// //? @access     Admin
// const createIGDB = async (req, res) => {
//   const config = {
//     url: '/games',
//     data: `fields name, cover.image_id, rating, first_release_date, genres.name, screenshots.image_id, summary, involved_companies.company.name, involved_companies.company.websites.url, involved_companies.company.developed, involved_companies.developer, category, aggregated_rating, aggregated_rating_count, expanded_games, dlcs, expansions, external_games.category, external_games.url, follows, franchise, hypes, parent_game, platforms.platform_logo.image_id, platforms.name, rating_count, slug, status, storyline, tags, total_rating, total_rating_count, websites.category, websites.url, version_parent, videos.video_id, age_ratings.category, age_ratings.rating, age_ratings.rating_cover_url, artworks.width, artworks.height, artworks.image_id, collection.name, game_modes.name, game_modes.slug, similar_games; limit 1; where id = ${req.body.id};`
//   };

//   try {
//     const createdGame = (await igdb.request(config)).data;

//     // Rename each game's 'id' to 'game_id'
//     delete Object.assign(createdGame, { 'game_id': createdGame.id })['id'];

//     // Adjust game's release date + add human date string
//     if (createdGame.first_release_date !== undefined) {
//       createdGame.first_release_date = new Date(createdGame.first_release_date) * 1000;
//       createdGame.local_date = new Date(createdGame.first_release_date)
//         .toLocaleDateString('en-US', {
//           day: 'numeric',
//           year: 'numeric',
//           month: 'short'
//         });
//     }

//     // Rename 'collection' to 'gameCollection'
//     // (mongoDB doesn't allow 'collection' as a field name)
//     if (createdGame.collection != undefined) {
//       delete Object.assign(createdGame, { 'game_collection': createdGame.collection })['collection'];
//     }

//     await Games.create(createdGame);
//     return res.status(200).json({ message: `Added ${req.body.name} to Frontloggd MongoDB` });
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// };

// //? @desc       Updates newly updated IGDB games into Frontloggd MongoDB
// //? @route      POST /games/update-igdb
// //? @access     Admin
// const updateIGDB = async (req, res) => {
//   const config = {
//     url: '/games',
//     data: `fields name, cover.image_id, rating, first_release_date, genres.name, screenshots.image_id, summary, involved_companies.company.name, involved_companies.company.websites.url, involved_companies.company.developed, involved_companies.developer, category, aggregated_rating, aggregated_rating_count, expanded_games, dlcs, expansions, external_games.category, external_games.url, follows, franchise, hypes, parent_game, platforms.platform_logo.image_id, platforms.name, rating_count, slug, status, storyline, tags, total_rating, total_rating_count, websites.category, websites.url, version_parent, videos.video_id, age_ratings.category, age_ratings.rating, age_ratings.rating_cover_url, artworks.width, artworks.height, artworks.image_id, collection.name, game_modes.name, game_modes.slug, similar_games; limit 1; where id = ${req.body.id};`
//   };

//   try {
//     const updatedGame = (await igdb.request(config)).data;

//     // Rename each game's 'id' to 'game_id'
//     delete Object.assign(updatedGame, { 'game_id': updatedGame.id })['id'];

//     // Adjust game's release date + add human date string
//     if (updatedGame.first_release_date !== undefined) {
//       updatedGame.first_release_date = new Date(updatedGame.first_release_date) * 1000;
//       updatedGame.local_date = new Date(updatedGame.first_release_date)
//         .toLocaleDateString('en-US', {
//           day: 'numeric',
//           year: 'numeric',
//           month: 'short'
//         });
//     }

//     // Rename 'collection' to 'gameCollection'
//     // (mongoDB doesn't allow 'collection' as a field name)
//     if (updatedGame.collection != undefined) {
//       delete Object.assign(updatedGame, { 'game_collection': updatedGame.collection })['collection'];
//     }

//     await Games.updateOne({ game_id: req.body.id }, updatedGame);
//     return res.status(200).json({ message: `Updated ${req.body.name} in Frontloggd MongoDB` });
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// };

// //? @desc       Deletes newly deleted IGDB games into Frontloggd MongoDB
// //? @route      POST /games/delete-igdb
// //? @access     Admin
// const deleteIGDB = async (req, res) => {
//   try {
//     await Games.deleteOne({ game_id: req.body.id });
//     return res.status(200).json({ message: `Deleted ${req.body.name} from Frontloggd MongoDB` });
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// };
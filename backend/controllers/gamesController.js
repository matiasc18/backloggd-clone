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

module.exports = {
  getGames,
}
const router = require('express').Router();
const axios = require('axios');

// * GET: Get all games
router.route('/').post(async (req, res) => {

  //? Default config for reguesting to IGDB
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

    res.json({totalCount: countResponse.data.count, results: gamesResponse.data});
  } catch(err) {
    res.json(err);
  }
});

module.exports = router;
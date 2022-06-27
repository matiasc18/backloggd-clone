// Import express router and mongoose model
const router = require('express').Router();
const axios = require('axios');

// * GET: Get all games
router.route('/').post(async (req, res) => {

  console.log(req.body);

  // Default config for reguesting to IGDB
  const config = {
    method: 'post',
    url: '/games',
    baseURL: process.env.IGDB_URI,
    headers: {
      'Accept': 'application/json',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    },
    responseType: 'json',
    timeout: 1000, // 1 second timeout
    data: req.body.query
  };

  try {
    const response = await axios.request(config);

    res.json(response.data);
  } catch(err) {
    console.error(err);
  }
});

module.exports = router;
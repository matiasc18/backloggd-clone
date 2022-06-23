// Import express router and mongoose model
const router = require('express').Router();
const axios = require('axios');

// GET: Get all games
router.route('/').post(async (req, res) => {
  const body = `fields ${req.body.fields}; ${req.body.content}`;

  const config = {
    method: 'post',
    url: '/games',
    baseURL: process.env.IGDB_URI,
    headers: {
      'Content-Type': 'text/plain',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    },
    responseType: 'json',
    timeout: 1000, // 1 second timeout
    data: body
  };

  try {
    const response = await axios.request(config);

    console.log(response.data);
    res.json(response.data);
  } catch(err) {
    console.error(err);
  }
});

module.exports = router;
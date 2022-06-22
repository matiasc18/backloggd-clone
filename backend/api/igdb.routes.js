const axios = require('axios');
// Import express router and mongoose model
const router = require('express').Router();

// GET: Get all games
router.route('/').post((req, res) => {
  // Format: { 'fields': 'name', 'content': 'fields name; where platforms = 48; limit 20;}
  const body = `fields ${req.body.fields}; ${req.body.content}`;
  
  const config = {
    method: 'POST',
    url: 'https://api.igdb.com/v4/games',
    headers: {
      // 'Content-type': 'application/json',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    },
    data: body
  };

  axios.request(config)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;


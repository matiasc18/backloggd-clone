const router = require('express').Router();
const { getGames } = require('../controllers/gamesController');

// * GET: Get all games
//TODO change to GET instead of POST
//TODO Change query to be in params rather than in body
router.route('/').post(getGames);

module.exports = router;
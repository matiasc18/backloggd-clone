const router = require('express').Router();
const { getGames, addUserGame } = require('../controllers/gamesController');
const { protect } = require('../middleware/authMiddleware');

// * GET: Get all games
//TODO change to GET instead of POST
//TODO Change query to be in params rather than in body
router.route('/').post(getGames);

// * POST: Add games to a user
router.route('/add').post(protect, addUserGame);

module.exports = router;
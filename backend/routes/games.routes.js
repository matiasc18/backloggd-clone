const router = require('express').Router();
const { getGames, addUserGames, getUserGames, getFavorites, addFavorite } = require('../controllers/gamesController');
const { protect } = require('../middleware/authMiddleware');

// * GET: Get all games
//TODO change to GET instead of POST
//TODO Change query to be in params rather than in body
router.route('/').post(getGames);

// * POST: Add games to a user
router.route('/backlog/add').post(protect, addUserGames);

// * GET: Get all of user's games
router.route('/backlog/all').get(protect, getUserGames);

// * GET / DELETE
//? Get all of user's favorite games / Add favorite game to user's backlog
router.route('/backlog/favorites').get(protect, getFavorites).post(protect, addFavorite);

module.exports = router;
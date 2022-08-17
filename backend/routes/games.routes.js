const router = require('express').Router();
const { getGames, getGameDetails, cloneIGDB } = require('../controllers/gamesController');

//* GET
//? Get all games
//TODO change to GET instead of POST
//TODO Change query to be in params rather than in body
router.route('/').post(getGames);

//* GET
//? Get game details
router.route('/:id').get(getGameDetails);

router.route('/clone-igdb').post(cloneIGDB); 

module.exports = router;
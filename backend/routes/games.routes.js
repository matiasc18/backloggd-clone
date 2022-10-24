const router = require('express').Router();
const { getGames, getGameDetails, searchGames } = require('../controllers/gamesController');

//* GET
//? Get all games
//TODO change to GET instead of POST
//TODO Change query to be in params rather than in body
router.route('/').post(getGames);

//* GET
//? Get game details
router.route('/:id').get(getGameDetails);

//* GET
//? Search for game(s)
router.route('/search/:name').get(searchGames);

// router.route('/clone-igdb').post(cloneIGDB); 
// router.route('/create-igdb').post(createIGDB);
// router.route('/update-igdb').post(createIGDB);
// router.route('/delete-igdb').post(createIGDB);

module.exports = router;
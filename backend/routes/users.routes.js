const router = require('express').Router();
const { registerUser, loginUser, getUserInfo, deleteUser, addUserGames, getUserGames, getFavorites, addFavorite, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

//* POST 
//? Add new user
router.route('/register').post(registerUser);

//* POST
//? Log user in
router.route('/login').post(loginUser);

//* GET / DELETE
//? Get user data / Delete user
router.route('/').get(protect, getUserInfo).delete(protect, deleteUser);

router.route('/update').post(protect, updateUser);

//? User games and favorites (below)

//* POST
//? Add games to a user
router.route('/games/add').post(protect, addUserGames);

//* GET
//? Get all of user's games
router.route('/games/all').get(protect, getUserGames);

//* GET
//? Get all of user's favorite games
router.route('/favorites/all').get(protect, getFavorites)

//* POST
//? Add favorite game to user's backlog
router.route('/favorites/add').post(protect, addFavorite);

module.exports = router;
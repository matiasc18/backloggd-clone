// Import express router and User mongoose model
const router = require('express').Router();
const { registerUser, loginUser, getUserInfo, deleteUser } = require('../controllers/userController');
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

//TODO Add update user function

module.exports = router;
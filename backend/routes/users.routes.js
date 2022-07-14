// Import express router and User mongoose model
const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/userController');

//* POST 
//? Add new user
router.route('/register').post(registerUser);

//* POST
//? Log user in
router.route('/login').post(loginUser);

module.exports = router;
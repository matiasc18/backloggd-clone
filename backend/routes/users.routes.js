// Import express router and User mongoose model
const router = require('express').Router();
const { registerUser, loginUser, getUserInfo, deleteUser } = require('../controllers/userController');

//* POST 
//? Add new user
router.route('/register').post(registerUser);

//* POST
//? Log user in
router.route('/login').post(loginUser);

//* GET / DELETE
//? Get user information / Delete user
router.route('/:id').get(getUserInfo).delete(deleteUser);

//TODO Add update user function

module.exports = router;
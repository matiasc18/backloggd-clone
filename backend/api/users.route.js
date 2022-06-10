// Import express router and mongoose model
import express from 'express';
const router = express.Router();

// GET: Get all users
router.route('/').get((req, res) => {

});

export default router;
// let User = require('../models/user.model');

// // GET: Get all users
// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // POST: Add new user
// router.route('/add').post((req, res) => {
//   const { username, password } = req.body;
//   const newUser = new User({ username, password });

//   newUser.save()
//     .then(() => res.json('User added'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;
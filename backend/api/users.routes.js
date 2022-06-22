// Import express router and mongoose model
const router = require('express').Router();
let User = require('../models/users.model.js');

// GET: Get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST: Add new user
router.route('/add').post((req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
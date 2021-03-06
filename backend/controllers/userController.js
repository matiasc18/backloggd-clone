const User = require('../models/user.model.js');
const Game = require('../models/game.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//? @desc       Register user
//? @route      POST /users/register
//? @access     Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Attempt user registration
    const newUser = await User.create({ 
      username, 
      email, 
      password: hashedPassword,
      favorites: 0,
      games: 0
    });

    await Game.create({
      user: newUser._id,
      games: [],
      favorites: []
    });

    // If user successfully created and saved, create a JWT and return it in response
    return res.status(201).json({ username: username, accessToken: genToken(newUser._id, username) });
  } catch(err) {
      // Duplicate key (username or email)
      if (err.code === 11000) {
        if (err.keyValue.username)
          return res.status(409).json({error: 'Username already taken'});
        else if (err.keyValue.email)
          return res.status(409).json({error: 'Email already in use'});
      }
      // Otherwise, some other error
      else
        return res.status(400).json({error: 'Registration failed'})
  }
};

//? @desc       Log in user
//? @route      POST /users/login
//? @access     Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username: username }).select('+password');

    // If username correct but wrong password, return error
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(404).json({error: 'Invalid username / password'});
    }

    // If the user exists and password is correct, create a JWT and return it in response
    return res.status(200).json({ username: username, accessToken: genToken(user._id, username) });
  } catch(err) {  
      // Otherwise, the user doesn't exist or username is wrong
      return res.status(404).json({error: 'Invalid username / password'});
  }
};

//? @desc       Get user data
//? @route      GET /users/
//? @access     Private
// id gotten from accessToken in header auth (Bearer token)
const getUserInfo = async (req, res) => {
  try {
    // Find user by id and return their data (username and favorite games)
    const user = await User.findById(req.user._id, { username: 1, favorites: 1 });

    return res.status(200).json({ user });
  } catch(err) {
    // If the user doesn't exist, return error
    return res.status(404).json({message: 'User not found'});
  }
};

//? @desc       Delete user
//? @route      DELETE /users/:id
//? @access     Private
const deleteUser = async (req, res) => {
  try {
    // Find user by id and delete
    // const user = await User.findById(userId);
    const user = await User.findById(req.user._id);

    await user.remove();
    return res.status(200).json({ id: req.params.id, message: 'User successfully deleted'});
  } catch(err) {
      // If the user doesn't exist, return error
      return res.status(404).json({message: 'User not found'});
  }
};

// Generate JWT with userId as payload
const genToken = (id, username) => {
  return jwt.sign(
    { 
      id: id,
      username: username
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d'}
  );
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser
}
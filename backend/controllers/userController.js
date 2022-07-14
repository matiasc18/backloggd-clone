const User = require('../models/users.model.js');
const jwt = require('jsonwebtoken');

//? @desc       Register user
//? @route      POST /users/register
//? @access     Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ 
      username, 
      email, 
      password 
    });

    // If user successfully created and saved, return user info
    return res.status(200).json({message: 'User sucessfully registered'});
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

  // Find user with username and password
  const user = await User.findOne({ username: username, password: password });

  // If the user exists, create a JWT and return it in response
  if (user) {
    const accessToken = jwt.sign({ username: username }, process.env.JWT_SECRET);
    return res.status(200).json({message: 'Logged in', accessToken: accessToken});
  } 
  // Otherwise, the user doesn't exist or username/password wrong
  else {
    return res.status(404).json({message: 'Username/Password Incorrect'});
  }
};

module.exports = {
  registerUser,
  loginUser
}
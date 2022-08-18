const Users = require('../models/user.model.js');
const Games = require('../models/game.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//? @desc       Register user
//? @route      POST /users/register
//? @access     Public
// TODO Add username, pass, email validation check, and validate if not already validated
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Attempt user registration
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword
    });

    // If user successfully created and saved, create a JWT and return it in response
    return res.status(201).json({ username: username, accessToken: genToken(newUser._id, username) });
  } catch (err) {
    // Duplicate key (username or email)
    if (err.code === 11000) {
      if (err.keyValue.username)
        return res.status(409).json({ error: 'Username already taken' });
      else if (err.keyValue.email)
        return res.status(409).json({ error: 'Email already in use' });
    }
    // Otherwise, some other error
    return res.status(400).json({ error: err.message });
  }
};

//? @desc       Log in user
//? @route      POST /users/login
//? @access     Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await Users.findOne({ username: username }).select('+password');

    // If username correct but wrong password, return error
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(404).json({ error: 'Invalid username / password' });
    }

    // If the user exists and password is correct, create a JWT and return it in response
    return res.status(200).json({ username: username, accessToken: genToken(user._id, username) });
  } catch (err) {
    // Otherwise, the user doesn't exist or username is wrong
    return res.status(404).json({ error: 'Invalid username / password', errorMessage: err.message });
  }
};

//? @desc       Get user data
//? @route      GET /users/
//? @access     Private
// TODO Possibly add more fields to the response
// id gotten from accessToken in header auth (Bearer token)
const getUserInfo = async (req, res) => {
  try {
    // Find user by id and return their data (username and favorite games)
    const user = await Users.findById(req.user.id);

    return res.status(200).json({
      bio: user.bio,
      games: user.games,
      favorites: user.favorites,
      totalGames: user.totalGames,
      totalFavorites: user.totalFavorites,
      dateJoined: new Date(user.createdAt)
        .toLocaleDateString('en-US', {
          day: 'numeric',
          year: 'numeric',
          month: 'short'
        })
    }
    );
  } catch (err) {
    // If the user doesn't exist, return error
    return res.status(404).json({ message: 'User not found' });
  }
};

//? @desc       Update user data
//? @route      POST /users/update
//? @access     Private
// id gotten from accessToken in header auth (Bearer token)
const updateUser = async (req, res) => {
  try {
    // Find user by id and return their data (username and favorite games)
    await Users.updateOne({ _id: req.user.id }, req.body);

    return res.status(200).json({ message: 'User updated' });
  } catch (err) {
    // If the user doesn't exist, return error
    return res.status(404).json({ message: 'User not found' });
  }
};

//? @desc       Delete user
//? @route      DELETE /users/:id
//? @access     Private
const deleteUser = async (req, res) => {
  try {
    // Find user by id and delete
    await Users.deleteOne({ _id: req.user.id });
    return res.status(200).json({ id: req.user.id, message: 'User successfully deleted' });
  } catch (err) {
    // If the user doesn't exist, return error
    return res.status(404).json({ message: 'User not found' });
  }
};

//? Generate JWT with user's id and username as payload
const genToken = (id, username) => {
  return jwt.sign(
    {
      id: id,
      username: username
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
}

//? @desc       Add game(s) to a user
//? @route      POST /users/games/add
//? @access     Private
const addUserGames = async (req, res) => {
  const { gamesToAdd } = req.body;

  if (gamesToAdd) {
    try {
      const user = await Users.findById(req.user.id);
      const duplicateIndexes = [];

      // Removes duplicate games
      for (let i = 0; i < gamesToAdd.length; i++) {
        // If the user alreadu has the game, skip
        if (user.games.some(id => id === gamesToAdd[i])) {
          duplicateIndexes.push(i);
          continue;
        }

        // Otherwise, add the game to their list
        await user.updateOne(
          {
            $push: { games: gamesToAdd[i] },
            $inc: { totalGames: 1 }
          }
        );
      }

      // No games added
      if (duplicateIndexes.length === gamesToAdd.length) {
        return res.status(409).json({ error: 'You already own all of these games' });
      }

      const message = (gamesToAdd.length - duplicateIndexes.length === 1) ?
        `Added to backlog`
        : `Added (${gamesToAdd.length - duplicateIndexes.length}) to backlog`;

      // TODO Fix user.games (returns [] when adding first games)
      return res.status(200).json({ message: message, total: gamesToAdd.length - duplicateIndexes.length });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  return res.status(400).json({ error: 'No body received' });
};

//? @desc       Get user's games
//? @route      GET /users/games/all
//? @access     Private
const getUserGames = async (req, res) => {
  try {
    const { games } = await Users.findById(req.user.id);

    const userGames = await Games.find().where('game_id').in(games);
    return res.status(200).json(userGames);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

//? @desc       Get user's favorite games
//? @route      GET /users/favorites/all
//? @access     Private
const getFavorites = async (req, res) => {
  try {
    const { favorites } = await Users.findById(req.user.id);

    const userFavorites = await Games.find().where('game_id').in(favorites);
    return res.status(200).json(userFavorites);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

//? @desc       Add favorite game to a user
//? @route      POST /users/favorites/add
//? @access     Private
const addFavorite = async (req, res) => {
  const { game } = req.body;

  if (game) {
    try {
      // Update user's favorites list and favorites count
      await Users.findOneAndUpdate({ _id: req.user.id },
        {
          $push: { favorites: game.game_id },
          $inc: { totalFavorites: 1 }
        }
      );

      return res.status(200).json({ message: `${req.user.username} added ${game.name} to their favorites!` });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  return res.status(400).json({ error: 'No body received' });
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser,
  addUserGames,
  getUserGames,
  addFavorite,
  getFavorites,
  updateUser
}
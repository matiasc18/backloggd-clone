const Users = require('../models/user.model.js');
const Games = require('../models/game.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const frontloggd = require('../axios');

//? @desc       Register user
//? @route      POST /users/register
//* @access     Public
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
//* @access     Public
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
//* @access     Private
// TODO Possibly add more fields to the response
// id gotten from accessToken in header auth (Bearer token)
const getUserInfo = async (req, res) => {
  try {
    // Find user by id and return their data (username and favorite games)
    const user = await Users.findById(req.user.id);

    return res.status(200).json({
      bio: user.bio,
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
//* @access     Private
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
//* @access     Private
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

//* Generate JWT with user's id and username as payload
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
//* @access     Private
const addUserGames = async (req, res) => {
  const { games } = req.body;

  if (games) {
    try {
      const user = await Users.findById(req.user.id);
      const duplicateGames = [];
      const gamesToAdd = [];

      // Removes duplicate games
      for (let i = 0; i < games.length; i++) {
        // If the user already has the game, skip
        if (user.games.some(game => game == games[i])) {
          duplicateGames.push(games[i]);
          continue;
        }

        gamesToAdd.push(games[i]);

        // Otherwise, add the game to their list
        await user.updateOne(
          {
            $push: { games: gamesToAdd[i] },
            $inc: { totalGames: 1 }
          }
        );
      }

      // No games added
      if (duplicateGames.length == games.length) {
        return res.status(409).json({ error: games.length > 1 ? 'All games already in your backlog' : 'Already in your backlog' });
      }

      const message = (games.length - duplicateGames.length === 1) ?
        `Added to backlog`
        : `Added (${games.length - duplicateGames.length}) to backlog`;

      return res.status(200).json({ message: message, total: games.length - duplicateGames.length, gamesAdded: gamesToAdd });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  return res.status(400).json({ error: 'No body received' });
};

//? @desc       Get user's games
//? @route      GET /users/games/all
//* @access     Private
const getUserGames = async (req, res) => {
  const config = {
    url: 'games/',
    method: 'post',
    data: {
      query: {
        fields: 'name, cover.image_id, rating',
        filter: '',
        sort: '',
        limit: 500,
        page: 1,
        search: ''
      },
      queryString: 'fields name, cover.image_id, rating; limit 500;'
    }
  };

  try {
    // Find user and their games
    const { games } = await Users.findById(req.user.id);

    // Modify axios config for requesting to fl/games/
    config.data.queryString += ' where id = (';
    config.data.query.filter = 'id = (';
    games.map((game, index) => {
      if (index < games.length - 1) {
        config.data.queryString += `${game}, `;
        config.data.query.filter += `${game}, `;
      }
      else {
        config.data.queryString += `${game});`;
        config.data.query.filter += `${game})`;
      }
    });

    console.log(config.data.queryString);

    const userGames = await frontloggd.request(config);

    return res.status(200).json(userGames.data);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

//? @desc       Get user's favorite games
//? @route      GET /users/favorites/all
//* @access     Private
const getFavorites = async (req, res) => {
  const config = {
    url: 'games/',
    method: 'post',
    data: {
      query: {
        fields: 'name, cover.image_id, rating',
        filter: '',
        sort: '',
        limit: 500,
        page: 1,
        search: ''
      },
      queryString: 'fields name, cover.image_id, rating;'
    }
  };

  try {
    // Find user and their favorites
    const { favorites } = await Users.findById(req.user.id);

    // Modify axios config for requesting to fl/games/
    config.data.queryString += ' where id = (';
    config.data.query.filter = 'id = (';
    favorites.map((game, index) => {
      if (index < favorites.length - 1) {
        config.data.queryString += `${game}, `;
        config.data.query.filter += `${game}, `;
      }
      else {
        config.data.queryString += `${game});`;
        config.data.query.filter += `${game})`;
      }
    });

    const userFavorites = await frontloggd.request(config);

    return res.status(200).json(userFavorites.data);
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

//? @desc       Add favorite game to a user
//? @route      POST /users/favorites/add
//* @access     Private
const addFavorite = async (req, res) => {
  const { game } = req.body;

  if (game) {
    try {
      // Update user's favorites list and favorites count
      await Users.updateOne({ _id: req.user.id },
        {
          $push: { favorites: game.id },
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
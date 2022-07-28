const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

// Protect private routes by verifying access token
const protect = asyncHandler(async (req, res, next) => {
  let accessToken;

  // If there is an authorization provided in the header and it begins with 'Bearer', continue
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get accessToken from header
      accessToken = req.headers.authorization.split(' ')[1];

      // If there is no accessToken provided, return error in response
      if (!accessToken)
      return res.status(401).json({message: 'Not authorized, no access token'});
      
      // Verify token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

      // Get user from token
      // Access user from any protected route
      const user = await User.findById(decoded.id);
      req.user = {
        id: decoded.id,
        username: decoded.username,
        favCount: user.favorites,
        gameCount: user.games
      };

      next();
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({message: 'Not authorized'});
    }
  }
  // Otherwise, there is no Authorization: Bearer header
  if (!accessToken)
    return res.status(401).json({message: 'Not authorized, no access token'});
});

module.exports = { protect };
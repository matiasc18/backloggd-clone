// Import required
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Environment variables
require('dotenv').config();

// Create express server
const app = express();
const port = process.env.PORT || 3500;
// Cors middleware / parse json
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Import route files
const usersRouter = require('./api/users.routes');
app.use('/users', usersRouter);
const gamesRouter = require('./api/igdb.routes');
app.use('/games', gamesRouter);

// Catch for request to nonexistant page
app.use('*', (req, res) => res.status(404).json({ error: 'not found'}));

// Starts server
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
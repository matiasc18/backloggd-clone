// Import required
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

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

// API Routes
app.use('/users', require('./routes/users.routes'));
app.use('/games', require('./routes/games.routes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html')));
} else {
  // Catch for request to nonexistant page
  app.use('*', (req, res) => res.status(404).json({ error: 'Please switch to production.'}));
}

// Starts server
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
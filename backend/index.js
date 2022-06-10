// Import required
import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import userDAO from './models/usersDAO.js';

// Environment variables
dotenv.config();
const port = process.env.PORT || 5000;

// Access MongoDB client / connect
const MongoClient = mongodb.MongoClient;

MongoClient.connect(
  process.env.MONGODB_URI,
  {
    maxPoolSize: 50,          // Max of 50 users at once
    wtimeoutMS: 2500,         // Time out after 2500ms
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await UsersDAO.injectDB(client);    // Get initial reference to users collection
    app.listen(port, () => {
      console.log('Listening on port ' + port);
    })
  });
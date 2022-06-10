// Store reference to DB
let users;

// Data Access Object
export default class UsersDAO {
  // Get reference to users DB when server starts
  static async injectDB(connection) {
    if (users) {
      return;
    }
    try {
      users = await connection.db(process.env.USERS_DB_URI).collection('users');
    } 
    catch (e) {
      console.error('Unable to establish a collection handle in user: ' + e);
    }
  }

  // TODO: MERN Video @ 27:00
  static async getUsers({user = null} = {}) {
    
  }

}

// const mongoose = require('mongoose');
// // import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3
//   },
//   password: {
//     type: String,
//     required: true,
//     unique: false,
//     trim: true,
//     minlength: 8
//   }
// }, {
//   timestamps: true,
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
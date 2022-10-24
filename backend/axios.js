const axios = require('axios');

const frontloggd = axios.create({
  baseURL: (process.env.NODE_ENV === 'production') 
    ? 'https://frontloggd.herokuapp.com/' 
    : 'http://localhost:3500/',
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json',
  timeout: 5000 // 5 second timeout
});

module.exports = frontloggd;
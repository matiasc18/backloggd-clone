const axios = require('axios');

const igdb = axios.create({
  method: 'post',
  baseURL: process.env.IGDB_URI,
  headers: {
    'Accept': 'application/json',
    'Client-ID': process.env.IGDB_CLIENT_ID,
    'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`
  },
  responseType: 'json',
  timeout: 10000, // 10 second timeout (1 second = too short)
});

module.exports = igdb;
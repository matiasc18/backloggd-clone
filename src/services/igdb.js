import axios from 'axios';

export default axios.create({
  url: '/games',
  baseURL: `https://api.igdb.com/v4`,
  headers: {
    // 'Content-type': 'application/json',
    'Client-ID': process.env.CLIENT_ID,
    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
  },
});
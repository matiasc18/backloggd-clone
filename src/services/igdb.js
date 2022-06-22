import axios from 'axios';

export default axios.create({
  baseURL: `https://api.igdb.com/v4`,
  headers: {
  }
});
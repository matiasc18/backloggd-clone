import axios from 'axios';

export default axios.create({
  baseURL: 'https://frontloggd.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  timeout: 5000 // 5 second timeout
});
import axios from 'axios';

export default axios.create({
  baseURL: process.env.AXIOS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  timeout: 5000 // 5 second timeout
});
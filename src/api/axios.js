import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3500',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  timeout: 5000 // 5 second timeout
});
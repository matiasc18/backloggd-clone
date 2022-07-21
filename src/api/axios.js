import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'production') 
    {
        baseUrl = 'https://frontloggd.herokuapp.com'
    }
    else
    {        
        baseUrl = 'http://localhost:3500';
    }

export default axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  timeout: 5000 // 5 second timeout
});
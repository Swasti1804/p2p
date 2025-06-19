import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // This will proxy to http://localhost:5000/api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;

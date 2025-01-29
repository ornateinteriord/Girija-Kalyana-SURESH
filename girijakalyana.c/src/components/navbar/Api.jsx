import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL
});

// Add token to headers if necessary
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

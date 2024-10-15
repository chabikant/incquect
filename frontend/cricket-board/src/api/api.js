// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Ensure this matches your backend URL

export const fetchCurrentScore = () => {
  return axios.get(`${API_URL}/current`);
};

export const updateScore = (run, currentBall) => {
  return axios.post(`${API_URL}/score`, { run, currentBall });
};

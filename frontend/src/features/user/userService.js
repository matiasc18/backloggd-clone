import axios from '../../api/axios';

// Get user information
const getUser = async (accessToken) => {
  const response = await axios.request({
    method: 'get',
    url: 'users/',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
};

// Add new game to backlog
const addGames = async (gameData, accessToken) => {
  const response = await axios.request({
    method: 'post',
    url: 'users/games/add',
    data: {
      games: gameData
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
};

// Get all of user's games
const getUserGames = async (accessToken) => {
  const response = await axios.request({
    method: 'get',
    url: 'users/games/all',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
};

// Get all of user's favorite games
const getFavorites = async (accessToken) => {
  const response = await axios.request({
    method: 'get',
    url: 'users/favorites/all',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
};

// Add a game to a user's favorites
const addFavorite = async (gameData, accessToken) => {
  const response = await axios.request({
    method: 'post',
    url: 'users/favorites/add',
    data: {
      games: gameData
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
};

const userService = {
  getUser,
  addGames,
  getUserGames,
  getFavorites,
  addFavorite
};

export default userService;
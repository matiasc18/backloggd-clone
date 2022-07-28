import axios from '../../api/axios';

// Add new game to backlog
const addGames = async (gameData, accessToken) => {
  const response = await axios.request({
    method: 'post',
    url: 'games/backlog/add',
    data: gameData,
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
    url: 'games/backlog/all',
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
    url: 'games/backlog/favorites',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
};

const gameService = {
  addGames,
  getUserGames,
  getFavorites
};

export default gameService;
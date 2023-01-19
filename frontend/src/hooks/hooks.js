import userService from '../features/user/userService';
import gameService from '../features/games/gameService';
import { queryBuilder, defaultQuery } from '../api/utils';
import { useQuery } from 'react-query';
import axios from '../api/axios';

export const addUserGames = async (gameData) => {
  try {
    // Get user's accessToken (JWT) from local storage (if it exists)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const data = await userService.addGames(gameData, user.accessToken);
      return data;
    }
    return 'Log in to add games!';
  } catch (err) {
    // Or return server error message in payload
    if (err.response.data)
      return err.response.data;
    const message = err.message || err.toString();
    return message;
  }
}

export const searchGames = async (name) => {
  try {
    const data = await gameService.searchGames(name);
    console.log(data);
    return data;
  } catch (err) {
    // Or return server error message in payload
    if (err.response.data)
      return err.response.data;
    const message = err.message || err.toString();
    return message;
  }
}

// export const getComingSoon = () => {
//   return useQuery('coming-soon')
// }

export const fetchGames = async(query) => {
  const response = await axios.request({
    method: 'post',
    url: 'games/',
    data: queryBuilder(query)
  });
  return response.data;
}

export const getGameDetails = async (id) => {
  const response = await axios.request({
    method: 'get',
    url: `games/${id}`
  });

  return response.data;
};
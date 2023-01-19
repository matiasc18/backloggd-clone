import axios from '../../api/axios';
import { queryBuilder, trendingQuery } from '../../api/utils';

//? Get game details
const getGameDetails = async (id) => {
  const response = await axios.request({
    method: 'get',
    url: `games/${id}`
  });

  return response.data;
};

const getTrendingGames = async () => {
  const response = await axios.request({
    method: 'post',
    url: 'games/',
    data: queryBuilder(trendingQuery)
  });

  return response.data;
};

const searchGames = async (name) => {
  const response = await axios.request({
    method: 'get',
    url: `games/seasrch/${name}`,
  });

  return response.data;
};

const gameService = {
  getGameDetails,
  getTrendingGames,
  searchGames
};

export default gameService;
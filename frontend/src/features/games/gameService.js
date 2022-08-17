import axios from '../../api/axios';
import { queryBuilder, defaultQuery } from '../../api/utils';

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
    data: queryBuilder(defaultQuery)
  });

  return response.data;
};

const gameService = {
  getGameDetails,
  getTrendingGames
};

export default gameService;


// import axios from '../../api/axios';
// import { queryBuilder, defaultQuery } from '../../api/utils';

// //? Get game details
// const getGameDetails = async (id) => {
//   const response = await axios.request({
//     method: 'get',
//     url: `games/${id}`
//   });

//   return response.data;
// };

// const getTrendingGames = async () => {
//   const response = await axios.request({
//     method: 'post',
//     url: 'games/',
//     data: queryBuilder(defaultQuery)
//   });

//   return response.data;
// };

// const gameService = {
//   getGameDetails,
//   getTrendingGames
// };

// export default gameService;
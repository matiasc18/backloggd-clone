import axios from '../../api/axios';

//? Get game details
const getGame = async (id) => {
  const response = await axios.request({
    method: 'get',
    url: `games/${id}`
  });

  return response.data;
};

const gameService = {
  getGame
};

export default gameService;
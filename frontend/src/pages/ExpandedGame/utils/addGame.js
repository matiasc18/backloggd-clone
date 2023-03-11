import axios from '../../../api/axios';

export const addGame = async (id) => {
  try {
    // Get user's accessToken (JWT) from local storage (if it exists)
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const response = await axios.request({
        method: 'post',
        url: 'users/games/add',
        data: {
          games: id
        },
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      return response.data;
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
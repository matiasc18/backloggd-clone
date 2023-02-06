import { useQuery } from 'react-query';
import axios from '../../../api/axios';

export const useUserGames = (query) => {
  // Get user's accessToken (JWT) from local storage (if it exists)
  const user = JSON.parse(localStorage.getItem('user'));
  
  return useQuery(`get-user-${query}`, async () => {
    const response = await axios.request({
      method: 'get',
      url: `users/${query}/all`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    });
    return response.data;
  }, { staleTime: 300000 });
};
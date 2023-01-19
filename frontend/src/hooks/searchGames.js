import { useQuery } from "react-query";
import axios from "../api/axios";

export const SearchGames = (name) => {
  return useQuery(`search-games`, async () => {
    const response = await axios.request({
      method: 'get',
      url: `games/search/${name}`,
    });
    return response.data;
  });
}
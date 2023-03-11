import { useQuery } from "react-query";
import axios from "../../../api/axios";

export const useSearch = (name) => {
  return useQuery(`search-games`, async () => {
    const response = await axios.request({
      method: 'get',
      url: `games/search/${name}`,
    });
    return response.data;
  });
}
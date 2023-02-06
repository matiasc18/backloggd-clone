import { getQuery } from '../utils/queryBuilder';
import { useQuery } from "react-query";
import axios from "../../../api/axios";

export const useFetchGames = (query) => {
  return useQuery(query, async () => {
    const response = await axios.request({
      method: 'post',
      url: 'games/',
      data: getQuery(query)
    });
    return response.data;
  }, { staleTime: 300000 });
}
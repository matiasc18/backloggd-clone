import { useQuery } from "react-query";
import { queryBuilder, trendingQuery, comingSoonQuery, popularThisMonthQuery } from '../api/utils';
import axios from "../api/axios";

const getQuery = (query) => {
  switch (query) {
    case 'trending':
      return queryBuilder(trendingQuery);
    case 'popular-this-month':
      return queryBuilder(popularThisMonthQuery);
    case 'coming-soon':
      return queryBuilder(comingSoonQuery);
  }
}

export const FetchGames = (query) => {
  return useQuery(`fetch-games`, async () => {
    const response = await axios.request({
      method: 'post',
      url: 'games/',
      data: getQuery(query)
    });
    return response.data;
  }, { staleTime: 300000 });
}

export const FetchTrendingGames = () => {
  return useQuery(`trending-games`, async () => {
    const response = await axios.request({
      method: 'post',
      url: 'games/',
      data: queryBuilder(trendingQuery)
    });
    console.log(response.data);
    return response.data;
  }, { staleTime: 300000 });
}

export const FetchComingSoon = () => {
  return useQuery(`coming-soon`, async () => {
    const response = await axios.request({
      method: 'post',
      url: 'games/',
      data: queryBuilder(comingSoonQuery)
    });
    return response.data;
  }, { staleTime: 300000 });
}

export const FetchPopularThisMonth = () => {
  return useQuery(`popular-this-month`, async () => {
    const response = await axios.request({
      method: 'post',
      url: 'games/',
      data: queryBuilder(popularThisMonthQuery)
    });
    return response.data;
  }, { staleTime: 300000 });
}
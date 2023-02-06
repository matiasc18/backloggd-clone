import { trendingQuery, popularThisMonthQuery, comingSoonQuery } from "./queries";

export const getQuery = (query) => {
  switch (query) {
    case 'trending':
      return queryBuilder(trendingQuery);
    case 'popular-this-month':
      return queryBuilder(popularThisMonthQuery);
    case 'coming-soon':
      return queryBuilder(comingSoonQuery);
    default:
      return 'trendingQuery';
  }
};

// ? IGDB query buiilder
// ? Takes in query object and constructs IGDB query string
const queryBuilder = (query) => {
  let qs = `fields ${query.fields}; limit ${query.limit}; `;
  qs += `${(query.filter !== '') ? 'where ' + query.filter + '; ' : ''}`;
  qs += `${(query.sort !== '') ? 'sort ' + query.sort + '; ' : ''}`;
  qs += `${(query.page !== 1) ? 'offset ' + ((query.page - 1) * query.limit) + '; ' : ''}`;
  qs += `${(query.search.trim() !== '') ? 'search "' + query.search.trim() + '";' : ''}`;

  const finalQuery = { query: query, queryString: qs.trim() };
  return finalQuery;
};
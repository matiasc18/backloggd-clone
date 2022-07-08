// ? Default IGDB query (trending page)
export const defaultQuery = {
  fields: 'name, cover.image_id, rating',
  filter: 'where rating > 78 & rating != null & cover != null & hypes != null',
  sort: 'sort hypes desc',
  limit: 30,
  page: 1,
  search: '',
}
  
// ? Default axios configuration (games request)
export const flDefault = {
  method: 'post',
  url: '/games',
  baseURL: 'http://localhost:3500',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  timeout: 5000 // 5 second timeout
};
  
// ? IGDB query buiilder
// ? Takes in query object and constructs IGDB query string
export const queryBuilder = (query) => {
  let qs = `fields ${query.fields}; limit ${query.limit}; `;
  qs += `${(query.filter !== 'where ') ? query.filter + '; ' : ''}`;
  qs += `${(query.sort !== 'sort ') ? query.sort + '; ' : ''}`;
  qs += `${(query.page !== 1) ? 'offset ' + (query.page * query.limit) + '; ' : ''}`;
  qs += `${(query.search.trim() !== '') ? 'search "' + query.search.trim() + '";' : ''}`;
  
  console.log(qs);
  const finalQuery = {query: query, queryString: qs.trim()};
  return finalQuery;
};

//? IGDB images url
export const imgPath = 'https://images.igdb.com/igdb/image/upload/t_1080p';
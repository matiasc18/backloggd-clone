export const defaultQuery = {
  fields: 'name, cover.image_id, rating',
  filter: 'where rating > 83 & rating != null & cover != null & hypes != null',
  sort: 'sort hypes desc;',
  limit: 30,
  page: 1,
  search: '',
}
  
export const flDefault = {
  baseURL: 'http://localhost:3500',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  timeout: 5000 // 5 second timeout
};
  
// * IGDB query buiilder
// * Default: `fields name; limit 10;`
// TODO Add @param spec
// ? Takes in query object and constructs IGDB query string
export const queryBuilder = (query) => {
  let qs = `fields ${query.fields}; limit ${query.limit}; `;
  qs += `${(query.filter !== 'where ') ? query.filter + '; ' : ''}`;
  qs += `${(query.sort !== 'sort ') ? query.sort + '; ' : ''}`;
  qs += `${(query.page !== 1) ? 'offset ' + (query.page * query.limit) + '; ' : ''}`;
  qs += `${(query.search.trim() !== '') ? 'search "' + query.search.trim() + '";' : ''}`;
  
  const finalQuery = {query: qs.trim()};
  return finalQuery;
};
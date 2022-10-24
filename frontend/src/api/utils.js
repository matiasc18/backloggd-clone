// ? Default IGDB query (trending page)
export const defaultQuery = {
  fields: 'name, cover.image_id, rating',
  filter: 'rating > 78 & rating != null & cover != null & hypes != null & first_release_date != null & genres.name != null & first_release_date != null & summary != null & category = (0,3,6,8,9,10,11)',
  sort: 'hypes desc',
  limit: 500,
  page: 1,
  search: '',
}

// ? Default IGDB query (trending page)
export const detailsQuery = {
  fields: 'name, cover.image_id, rating, first_release_date, genres.name, screenshots.image_id, summary, involved_companies.company.name, involved_companies.company.websites.url, involved_companies.company.developed, involved_companies.developer, category, aggregated_rating, aggregated_rating_count, expanded_games, dlcs, expansions, external_games.category, external_games.url, follows, franchise, hypes, parent_game, platforms.platform_logo.image_id, platforms.name, rating_count, slug, status, storyline, tags, total_rating, total_rating_count, websites.category, websites.url, version_parent, videos.video_id, age_ratings.category, age_ratings.rating, age_ratings.rating_cover_url, artworks.width, artworks.height, artworks.image_id, collection.name, game_modes.name, similar_games',
  filter: '',
  sort: '',
  limit: 500,
  page: 1,
  search: ''
}

// ? IGDB query buiilder
// ? Takes in query object and constructs IGDB query string
export const queryBuilder = (query) => {
  let qs = `fields ${query.fields}; limit ${query.limit}; `;
  qs += `${(query.filter !== '') ? 'where ' + query.filter + '; ' : ''}`;
  qs += `${(query.sort !== '') ? 'sort ' + query.sort + '; ' : ''}`;
  qs += `${(query.page !== 1) ? 'offset ' + ((query.page - 1) * query.limit) + '; ' : ''}`;
  qs += `${(query.search.trim() !== '') ? 'search "' + query.search.trim() + '";' : ''}`;

  const finalQuery = { query: query, queryString: qs.trim() };
  return finalQuery;
};

//? IGDB images url
export const imgPath = 'https://images.igdb.com/igdb/image/upload/t_1080p';

// User must begin with a letter, followed by 3-23 combination of letters, numbers, -, or _
export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// Must contain 1 lower, 1 upper, 1 number, 1 special character, 8-24 characters long
export const PASS_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%])[a-zA-Z0-9!@#$%]{8,24}$/;

// Email regex of form: (yourname) @ (domain) . (extension)(.again)
export const EMAIL_REGEX = /^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

export const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

//? Apply correct color based on game rating
export const getRatingColor = (rating) => {
  if (rating >= 95)
    return { backgroundColor: 'gold', color: 'black' };
  else if (rating >= 90)
    return { color: 'lime' };
  else if (rating >= 80)
    return { color: 'limegreen' };
  else if (rating >= 70)
    return { color: 'yellow' };
  else if (rating >= 60)
    return { color: 'orange' };
  else
    return { color: 'crimson' };
}
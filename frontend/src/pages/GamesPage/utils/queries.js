const MONTH = 2592000

const getCurrentDate = () => {
  return Math.floor(Date.now() / 1000);
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

export const trendingQuery = {
  fields: 'name, cover.image_id, rating, first_release_date',
  filter: 'rating != null & rating > 78 & cover != null & hypes != null & first_release_date != null & genres.name != null & first_release_date != null & summary != null & first_release_date != null & category = (0,3,6,8,9,10,11)',
  sort: 'hypes desc',
  limit: 500,
  page: 1,
  search: '',
}

export const comingSoonQuery = {
  fields: 'name, cover.image_id, first_release_date',
  filter: `hypes != null & cover != null & first_release_date != null & first_release_date >= ${getCurrentDate()} & first_release_date <= ${(3*MONTH) + getCurrentDate()}`,
  sort: 'hypes desc',
  limit: 6,
  page: 1,
  search: ''
}

// & first_release_date >= ${Math.floor(Date.now() / 1000)} & first_release_date <= ${(3*2592000) + Math.floor(Date.now() / 1000)}

export const popularThisMonthQuery = {
  fields: 'name, cover.image_id, rating',
  filter: 'rating > 78 & rating != null & cover != null & hypes != null & first_release_date != null & genres.name != null & first_release_date != null & summary != null & category = (0,3,6,8,9,10,11)',
  sort: 'hypes desc',
  limit: 5,
  page: 1,
  search: '',
}
export const sortGames = (games, sort) => {
  switch (sort) {
    case 'rating':
      return [...games].sort((game1, game2) => (game1.rating < game2.rating) ? 1 : ((game1.rating > game2.rating) ? -1 : 0));
    case 'a-z':
      return [...games].sort((game1, game2) => game1.name.localeCompare(game2.name));
    case 'z-a':
      return [...games].sort((game1, game2) => game2.name.localeCompare(game1.name));
    case 'release':
      return [...games].sort((game1, game2) => game2.first_release_date - game1.first_release_date);
    case 'default':
      return games;
  }
};
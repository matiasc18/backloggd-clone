// SHORTCUTS
CTRL + TAB = scroll thru open files
CTRL + SHIFT + TAB = scroll backwards thru open files
CMD + P = search
CMD + SHIFT + P = command palette
CMD + W = close file
CMD + SHIFT + W = close window
CMD + P = open file
@ (in the command palette) = brings up all symbols in the current file (similar to CMD + F)
  ^^ same as CMD + SHIFT + .
'#' (in the command palette) + symbol name = brings up all symbols with that name in all files


POST https://api.igdb/v4/games/
HEADER: 
  Client-ID: Client ID
  Authorization: Bearer access_token
fields *;

// Get name of 10 games
fields name; limit 10;

// Get all info of a games (1942 is id of the game)
fields *; where id = 1942;

// Get all info of multiple games
fields *; where id = (8, 9, 11);

// Count total games with rating 75+
https://api.igdb.com/v4/games/Count
where rating > 75;

// Order by rating
fields name, rating; sort rating desc;

// Coming soon games PS4
/v4/release_dates/
fields *; where game.platforms = 48 & date > 1538129354; sort date asc; (9/28/18 in ms) (48 = ps4 id)

// Search and return certain fields
search "Halo"; fields name, first_release_date;
fields name, involved_companies; search "Halo";
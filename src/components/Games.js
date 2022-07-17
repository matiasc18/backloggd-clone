import React, { useState, useEffect, Fragment } from 'react';
import { queryBuilder, defaultQuery, imgPath } from '../api/utils';
import Pagination from './Pagination';
import LoadingBar from './LoadingBar';
import '../styles/games.css';
import axios from '../api/axios';

//TODO Optimize game loading
  //TODO - Fetch all games at once + iterate through locally, rather than fetch every 30 games

//* Render grid of game cards
const Games = () => { 
  const [games, setGames] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  //? Axios request config
  const config = {
    method: 'post',
    url: '/games',
    query: defaultQuery,    // query object
    data: ''                // request body (stringified query)
  };

  //? Fetch games from IGDB
  const fetchGames = async () => {
    // Games loading...
    setLoading(true);

    // Build IGDB query string
    config.data = queryBuilder(config.query);

    try {
      // Axios request
      const response = await axios.request(config);
      
      // Games done loading...
      setLoading(false);

      // If there is a response, update games state + scroll to top
      if (response.status === 200) {
        setGames(response.data);
        window.scrollTo(0, 0);
      }
    } catch(err) {
      console.error(err);
    }
  }

  //* Initial render + on page change
  useEffect(() => {
    config.query.page = currentPage;
    fetchGames();
  }, [currentPage]);

  //* Runs whenever games updates
  useEffect(() => {
    console.log(games);
  }, [games]);

  //? Apply correct color based on game rating
  const getRatingColor = (rating) => {
    if (rating >= 95)
      return { backgroundColor: 'gold' , color: 'black' };
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

  //? Updates current page of results
  const updatePage = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Display game cards + page selector (bottom)
  return (
    <>
      { loading && <LoadingBar />}
      { games.results && 
        <Pagination 
          gamesPerPage={config.query.limit} 
          totalGames={games.totalCount} 
          currentPage={config.query.page} 
          updatePage={updatePage}
        /> }
      <div id="games-container">
        { games.results && games.results.map((game) => (
          <div key={game.id} className="game-card">
            <img className="game-cover" src={`${imgPath}/${game.cover.image_id}.jpg`} alt={`Cover art for ${game.name}`}/>
            <div className="game-info">
              <span className="game-title">{game.name}</span>
              <span className="game-rating" style={getRatingColor(Math.floor(game.rating))}>{Math.floor(game.rating)}</span>
            </div>
          </div>
        ))}
      </div>
      { games.results && 
        <Pagination 
          gamesPerPage={config.query.limit} 
          totalGames={games.totalCount} 
          currentPage={config.query.page} 
          updatePage={updatePage}
        /> }
    </>
  )
}

export default Games;
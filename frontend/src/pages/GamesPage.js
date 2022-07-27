import React, { useState, useEffect } from 'react';
import Games from '../components/Games';
import '../styles/gamesPage.css';
import { queryBuilder, defaultQuery, imgPath } from '../api/utils';
import Pagination from './Pagination';
import LoadingBar from './LoadingBar';
import axios from '../api/axios';

//TODO Have games fetched from api here instead of in components/Games
  //TODO Have games fetched in like usser goals instead (from tut)
  //TODO Have this be the landing page
const GamesPage = () => {
  const [games, setGames] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  //? Axios request config
  const config = {
    method: 'post',
    url: 'games',
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

  return (
    <main id="games-page">
      <h2>Trending Games</h2>
      <hr />
      <Games props={games.results}/>
    </main>
  )
}

export default GamesPage;
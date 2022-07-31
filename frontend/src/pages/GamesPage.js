import React, { useState, useEffect } from 'react';
import { queryBuilder, defaultQuery } from '../api/utils';
import Pagination from '../components/Pagination';
import LoadingBar from '../components/LoadingBar';
import Games from '../components/Games';
import axios from '../api/axios';
// import gamesStyles from '../styles/gamesPage.module.css';

//TODO Have games fetched in like usser goals instead (from tut)
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

  //* Initial render + on page change
  useEffect(() => {
    config.query.page = currentPage;

    //? Fetch games from IGDB
    (async () => {
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
    })();
    // eslint-disable-next-line
  }, [currentPage]);
  
  //* Runs whenever games updates
  useEffect(() => {
    // console.log(games);
  }, [games]);

  //? Updates current page of results
  const updatePage = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main id="games-page">
      <h2>Trending Games</h2>
      <hr />
      { games.results &&  
        <Pagination 
        gamesPerPage={config.query.limit} 
        totalGames={games.totalCount} 
        currentPage={config.query.page} 
        updatePage={updatePage}
        /> }
      { loading && <LoadingBar />}
      <div id="games-container">
        <Games games={games.results} list={1}/>
      </div>
      { games.results && 
        <Pagination 
          gamesPerPage={config.query.limit} 
          totalGames={games.totalCount} 
          currentPage={config.query.page} 
          updatePage={updatePage}
        /> }
    </main>
  )
}

export default GamesPage;
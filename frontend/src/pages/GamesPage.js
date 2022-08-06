import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import LoadingBar from '../components/LoadingBar';
import Games from '../components/Games';
import { useSelector, useDispatch } from 'react-redux';
import { getTrendingGames, reset } from '../features/games/gameSlice.js';

//TODO Have games fetched in like usser goals instead (from tut)
const GamesPage = () => {
  // Get total list of games
  const { games, isLoading } = useSelector((state) => state.game);
  
  // Holds list of 30 games at a time
  const [displayedGames, setDisplayedGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const dispatch = useDispatch();
  
  // On initial render, get trending games
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!games) {
      dispatch(getTrendingGames());
    }
  }, []);
  
  useEffect(() => {

    if (games)
      setDisplayedGames(games.results.slice((currentPage - 1) * 30, currentPage * 30));

    return () => {
      dispatch(reset());
    };
  }, [games, currentPage, dispatch]);

  //? Updates current page of results
  const updatePage = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main id="games-page">
      <h2>Trending Games</h2>
      <hr />
      { games &&  
        <Pagination 
        gamesPerPage={30} 
        totalGames={games.totalCount} 
        currentPage={currentPage} 
        updatePage={updatePage}
        /> }
      { isLoading && <LoadingBar />}
      <div id="games-container">
        <Games games={displayedGames} list={1}/>
      </div>
      { games && 
        <Pagination 
        gamesPerPage={30} 
        totalGames={games.totalCount} 
        currentPage={currentPage} 
        updatePage={updatePage}
        /> }
    </main>
  )
}

export default GamesPage;

// import React, { useState, useEffect } from 'react';
// import { queryBuilder, defaultQuery } from '../api/utils';
// import Pagination from '../components/Pagination';
// import LoadingBar from '../components/LoadingBar';
// import Games from '../components/Games';
// import axios from '../api/axios';

// //TODO Have games fetched in like usser goals instead (from tut)
// const GamesPage = () => {
//   const [games, setGames] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   //? Axios request config
//   const config = {
//     method: 'post',
//     url: 'games',
//     query: defaultQuery,    // query object
//     data: ''                // request body (stringified query)
//   };

//   //* Initial render + on page change
//   useEffect(() => {
//     config.query.page = currentPage;

//     //? Fetch games from IGDB
//     (async () => {
//       // Games loading...
//       setLoading(true);

//       // Build IGDB query string
//       config.data = queryBuilder(config.query);

//       try {
//         // Axios request
//         const response = await axios.request(config);
        
//         // Games done loading...
//         setLoading(false);

//         // If there is a response, update games state + scroll to top
//         if (response.status === 200) {
//           setGames(response.data);
//           window.scrollTo(0, 0);
//         }
//       } catch(err) {
//           console.error(err);
//       }
//     })();
//     // eslint-disable-next-line
//   }, [currentPage]);
  
//   //* Runs whenever games updates
//   useEffect(() => {
//     // console.log(games);
//   }, [games]);

//   //? Updates current page of results
//   const updatePage = async (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <main id="games-page">
//       <h2>Trending Games</h2>
//       <hr />
//       { games.results &&  
//         <Pagination 
//         gamesPerPage={config.query.limit} 
//         totalGames={games.totalCount} 
//         currentPage={config.query.page} 
//         updatePage={updatePage}
//         /> }
//       { loading && <LoadingBar />}
//       <div id="games-container">
//         <Games games={games.results} list={1}/>
//       </div>
//       { games.results && 
//         <Pagination 
//           gamesPerPage={config.query.limit} 
//           totalGames={games.totalCount} 
//           currentPage={config.query.page} 
//           updatePage={updatePage}
//         /> }
//     </main>
//   )
// }

// export default GamesPage;
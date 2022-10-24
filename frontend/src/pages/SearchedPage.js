import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import Games from '../components/Games';
import LoadingBar from '../components/LoadingBar';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { searchGames } from '../features/games/gameSlice.js';

//TODO Fix service worker for page reload on this page
//TODO Fix loading bar
const SearchedPage = () => {
  const dispatch = useDispatch();
  const { gameSlug } = useParams();
  const gameName = gameSlug.replaceAll('-', ' ');

  // Holds list of 30 games at a time
  const [displayedGames, setDisplayedGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Search query that user typed in
  const [searchQuery, setSearchQuery] = useState('');

  // Get total list of searched games
  const { searchedGames, isLoading, isSuccess } = useSelector((state) => state.game);

  // Request new search when search query is changed
  useEffect(() => {
    dispatch(searchGames(gameName));
  }, [gameSlug]);

  // Set displayed games once all are loaded
  useEffect(() => {
    if (searchedGames) {
      // For displaying what the user typed in the search bar
      setSearchQuery(gameName);
      setDisplayedGames(searchedGames.results.slice((currentPage - 1) * 30, currentPage * 30));
    }
  }, [searchedGames, currentPage, dispatch]);

  //? Updates current page of results
  const updatePage = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main id="games-page">
      {searchedGames && <>
        <h2>{searchedGames.totalGames} results for {searchQuery}</h2>
        <hr />
      </>}
      { isLoading && <LoadingBar />}
      {searchedGames &&
        <Pagination
          gamesPerPage={30}
          totalGames={searchedGames.totalGames}
          currentPage={currentPage}
          updatePage={updatePage}
        />}
      <div id="games-container">
        {searchedGames && searchedGames.totalGames === 0 && <h3>No games found</h3>}
        <Games games={displayedGames} list={1} />
      </div>
      {searchedGames &&
        <Pagination
          gamesPerPage={30}
          totalGames={searchedGames.totalGames}
          currentPage={currentPage}
          updatePage={updatePage}
        />}
    </main>
  )
}

export default SearchedPage;

// import React, { useState, useEffect } from 'react';
// import Pagination from '../components/Pagination';
// import Games from '../components/Games';
// import { useDispatch } from 'react-redux';

// //TODO Have games fetched in like usser goals instead (from tut)
// const SearchedPage = ({ searchedGames, searchQuery }) => {
//   // Holds list of 30 games at a time
//   const [displayedGames, setDisplayedGames] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (searchedGames)
//       setDisplayedGames(searchedGames.results.slice((currentPage - 1) * 30, currentPage * 30));
//   }, [searchedGames, currentPage, dispatch]);

//   //? Updates current page of results
//   const updatePage = async (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <main id="games-page">
//       <h2>{searchedGames.totalGames} results for {searchQuery}</h2>
//       <hr />searchedGames &&
//         <Pagination
//           gamesPerPage={30}
//           totalGames={searchedGames.totalGames}
//           currentPage={currentPage}
//           updatePage={updatePage}
//         />
//       <div id="games-container">
//         { searchedGames && searchedGames.totalGames === 0 && <h3>No games found</h3>}
//         <Games games={displayedGames} list={1} />
//       </div>
//       {searchedGames &&
//         <Pagination
//           gamesPerPage={30}
//           totalGames={searchedGames.totalGames}
//           currentPage={currentPage}
//           updatePage={updatePage}
//         />}
//     </main>
//   )
// }

// export default SearchedPage;
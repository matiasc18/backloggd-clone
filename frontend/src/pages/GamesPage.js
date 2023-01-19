import { queryBuilder, trendingQuery } from '../api/utils';
import Pagination from '../components/Pagination';
import LoadingBar from '../components/LoadingBar';
import { FetchTrendingGames } from '../hooks/fetchGames.js';
import { useState, useMemo } from 'react';
import Games from '../components/Games';
import axios from '../api/axios';
import { useQuery } from 'react-query';

const GamesPage = () => {
  // Get total list of games
  const { data: games, error, isError, isLoading } = FetchTrendingGames('trending');
  const [currentPage, setCurrentPage] = useState(1);

  // Holds list of 30 games at a time
  const displayedGames = useMemo(() => {
    if (games) {
      return games.results.slice((currentPage - 1) * 30, currentPage * 30);
    }
  }, [games, currentPage]);

  //? Updates current page of results
  const updatePage = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main id="games-page">
      <h2>Trending Games</h2>
      <hr />
      {isError && <span>{error.message}</span>}
      {games &&
        <Pagination
          gamesPerPage={30}
          totalGames={games.totalGames}
          currentPage={currentPage}
          updatePage={updatePage}
        />}
      {isLoading && <LoadingBar />}
      <div className="games-container">
        {games && games.totalGames === 0 && <h3>No games found</h3>}
        <Games games={displayedGames} list={1} />
      </div>
      {games &&
        <Pagination
          gamesPerPage={30}
          totalGames={games.totalGames}
          currentPage={currentPage}
          updatePage={updatePage}
        />}
    </main>
  )
}

export default GamesPage;

// // Get total list of games
// const { games, isLoading } = useSelector((state) => state.game);

// // Holds list of 30 games at a time
// const [displayedGames, setDisplayedGames] = useState([]);
// const [currentPage, setCurrentPage] = useState(1);

// const dispatch = useDispatch();

// // On initial render, get trending games
// useEffect(() => {
//   if (!games) {
//     dispatch(getTrendingGames());
//   }
// }, []);

// useEffect(() => {
//   if (games)
//     setDisplayedGames(games.results.slice((currentPage - 1) * 30, currentPage * 30));

//   return () => {
//     dispatch(reset());
//   };
// }, [games, currentPage, dispatch]);

// //? Updates current page of results
// const updatePage = async (pageNumber) => {
//   setCurrentPage(pageNumber);
// };
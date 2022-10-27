import { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import Games from '../components/Games';
import LoadingBar from '../components/LoadingBar';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from '../api/axios';

//TODO Fix service worker for page reload on this page
const SearchedPage = () => {
  const { gameSlug } = useParams();
  const gameName = useMemo(() => {
    return gameSlug.replaceAll('-', ' '); // Deslugifies the game name slug
  }, [gameSlug]);

  // Conduct search
  const { data: searchedGames, isLoading, refetch } = useQuery(`search-games`, async () => {
    const response = await axios.request({
      method: 'get',
      url: `games/search/${gameName}`,
    });
    return response.data;
  }, { enabled: false });

  // 30 games displayed per page
  const [currentPage, setCurrentPage] = useState(1);
  const displayedGames = useMemo(() => {
    if (searchedGames)
      return searchedGames.results.slice((currentPage - 1) * 30, currentPage * 30);
  }, [currentPage, searchedGames]);

  useEffect(() => { // Request new search when search query is changed
    refetch(gameName);
  }, [gameSlug]);

  return (
    <main id="games-page">
      {searchedGames && <>
        <h2>{searchedGames.totalGames} results for {gameName}</h2>
        <hr />
      </>}
      {isLoading && <LoadingBar />}
      {searchedGames && <Pagination
        gamesPerPage={30}
        totalGames={searchedGames.totalGames}
        currentPage={currentPage}
        updatePage={(pageNumber) => { setCurrentPage(pageNumber) }}
      />}
      <div id="games-container">
        {searchedGames && searchedGames.totalGames === 0 && <h3>No games found</h3>}
        <Games games={displayedGames} list={1} />
      </div>
      {searchedGames && <Pagination
        gamesPerPage={30}
        totalGames={searchedGames.totalGames}
        currentPage={currentPage}
        updatePage={(pageNumber) => { setCurrentPage(pageNumber) }}
      />}
    </main>
  )
}

export default SearchedPage;
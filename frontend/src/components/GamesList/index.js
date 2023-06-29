import { useEffect, useMemo, useState } from 'react';
import Games from './utils/Games';
import Pagination from './utils/Pagination';
import SortList from './utils/SortList';

//* Render game cards
const GamesList = ({ data, list, newClass, listTitle }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [games, setGames] = useState(null);
  const displayedGames = useMemo(() => {
    if (games) return games.results.slice((currentPage - 1) * 30, currentPage * 30);
  }, [games, currentPage]);

  // Initializes games
  useEffect(() => {
    if (data)
      setGames({ totalGames: data.totalGames, results: data.results });
    console.log(data);
  }, [data]);

  //? Updates current page of results
  const updatePage = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Update games after sorting
  const updateGames = async (updatedGames, trendingFlag) => {
    if (trendingFlag) {
      setGames({ ...data });
    }
    else if (updatedGames) {
      setGames({ totalGames: data.totalGames, results: updatedGames });
    }
    updatePage(1);
  };

  return (
    <>
      {displayedGames &&
        <>
          <div className="game-bar">
            {listTitle}
            <SortList displayedGames={games.results} updateGames={updateGames} />
          </div>
          <div className={newClass}>
            <Games games={displayedGames} list={list} />
          </div>
          <Pagination
            gamesPerPage={30}
            totalGames={games.totalGames}
            currentPage={currentPage}
            updatePage={(pageNumber) => { setCurrentPage(pageNumber) }}
          />
        </>}
    </>
  )
}

export default GamesList;
import { useEffect, useRef, useState, useMemo } from "react";
import { FaAngleDown } from "react-icons/fa";
import { sortGames } from "./sortGames";

const SortList = ({ displayedGames, updateGames }) => {
  const effectRan = useRef(false);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('Trending');
  const sortedGames = useMemo(() => {
    return sortGames(displayedGames, sort);
  }, [sort]);

  // Removes focus when user clicks off sort dropdown
  document.onclick = (e) => {
    e.preventDefault();
    if (open && !e.target.classList.contains('sort-button')) {
      setOpen(false);
      document.getElementsByClassName('sort-button').blur();
    }
  };

  // Updates game when user changes sort
  useEffect(() => {
    // If user goes back to trending sort, use initial data
    if (sort === 'Trending')
      updateGames(sortedGames, 1);
    else updateGames(sortedGames, 0);
  }, [sortedGames]);

  // Update sort and close dropdown
  const updateSort = (newSort) => {
    setOpen(false);
    setSort(newSort);
  };

  return (
    <div>
      <span>Sort by: </span>
      <div className="sort-dropdown">
        <button type="button" onClick={() => setOpen(!open)} className="sort-button">{sort}<FaAngleDown className="sort-arrow" /></button>
        <div className={open ? 'show dropdown-content' : 'dropdown-content'}>
          <li id="trending" className={sort == 'Trending' ? 'selected-sort' : ''} onClick={() => updateSort('Trending')}>Trending</li>
          <li id="rating" className={sort == 'Rating' ? 'selected-sort' : ''} onClick={() => updateSort('Rating')}>Rating</li>
          <li id="a-z" className={sort == 'A-Z' ? 'selected-sort' : ''} onClick={() => updateSort('A-Z')}>A-Z</li>
          <li id="z-a" className={sort == 'Z-A' ? 'selected-sort' : ''} onClick={() => updateSort('Z-A')}>Z-A</li>
          <li id="release" className={sort == 'Release' ? 'selected-sort' : ''} onClick={() => updateSort('Release')}>Release Date</li>
        </div>
      </div>
    </div>
  )
}

export default SortList
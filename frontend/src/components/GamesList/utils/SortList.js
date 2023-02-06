import { useEffect, useRef, useState, useMemo } from "react";
import { FaAngleDown } from "react-icons/fa";
import { sortGames } from "./sortGames";

//TODO Remove focus when closing sort menu when clicking on sort button itself
const SortList = ({ displayedGames, updateGames }) => {
  const effectRan = useRef(false);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('trending');
  const sortedGames = useMemo(() => {
    return sortGames(displayedGames, sort);
  }, [sort]);

  // Removes focus when user clicks off sort dropdown
  document.onClick = (e) => {
    e.preventDefault();
    if (open && !e.target.classList.contains('sort-button')) {
      setOpen(false);
      document.getElementsByClassName('sort-button').blur();
    }
  };

  // Updates game when user changes sort
  useEffect(() => {
    // If user goes back to trending sort, use initial data
    if (sort === 'trending')
      updateGames(sortedGames, 1);
    else updateGames(sortedGames, 0);
  }, [sortedGames]);
  
  // Update sort and focus styling 
  const updateSort = (newSort) => {
    setOpen(false);
    document.getElementById(sort).classList.remove('selected-sort');
    document.getElementById(newSort).classList.add('selected-sort');
    setSort(newSort);
  };

  return (
    <div className="sort-dropdown">
      <button type="button" onClick={() => setOpen(!open)} className="sort-button">Sort<FaAngleDown className="sort-arrow" /></button>
      <div className={open ? 'show dropdown-content' : 'dropdown-content'}>
        <li id="trending" className="selected-sort" onClick={() => updateSort('trending')}>Trending</li>
        <li id="rating" onClick={() => updateSort('rating')}>Rating</li>
        <li id="a-z" onClick={() => updateSort('a-z')}>A-Z</li>
        <li id="z-a" onClick={() => updateSort('z-a')}>Z-A</li>
        <li id="release" onClick={() => updateSort('release')}>Release Date</li>
      </div>
    </div>
  )
}

export default SortList
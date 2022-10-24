import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ resetHeader }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Search when the user presses enter key
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Slugify the search query and reset search bar
      const paramSearch = search.replaceAll(' ', '-');
      e.target.value = '';
      navigate(`/search/${paramSearch}`);
    }
  };

  useEffect(() => {
    if (search)
      console.log(search);
  }, [search]);

  return (
    <>
      <input placeholder="Search" type="text" id="search" onSubmit={handleSearch} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch}/>
    </>
  )
}

export default SearchBar;

// import React, { useState, useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { searchGames, reset } from '../features/games/gameSlice.js';

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { searchedGames, isSuccess } = useSelector((state) => state.game);

//   const [search, setSearch] = useState('');
//   const [searched, setSearched] = useState(false);
//   let paramSearch = '';

//   const handleSearch = (e) => {
//     if (e.key === 'Enter')
//     {
//       paramSearch = search.replaceAll(' ', '-');
//       dispatch(searchGames(paramSearch));
//       setSearched(true);
//       e.target.value = '';
//       setSearch('');
//     }
//   };

//   useEffect(() => {
//     console.log(search);
//   }, [search]);

//   useEffect(() => {
//     if (isSuccess && searched && searchedGames) {
//       const games = searchedGames;
//       dispatch(reset());
//       navigate(`/search/${paramSearch}`, { searchedGames: games, searchQuery: search });
//     }

//   }, [searchedGames, isSuccess]);

//   return (
//     <>
//       <input type="text" id="search" onSubmit={handleSearch} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch}/>
//     </>
//   )
// }

// export default SearchBar;
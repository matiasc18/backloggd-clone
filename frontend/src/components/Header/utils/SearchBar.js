import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
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

  return (
    <input placeholder="Search" type="text" id="search" onSubmit={handleSearch} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} />
  )
}

export default SearchBar;
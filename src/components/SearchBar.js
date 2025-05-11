import React, { useState } from 'react';
import axios from 'axios';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';  // Import external CSS

const SearchBar = ({ setMovies, setIsSearching }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}`
      );
      setMovies(res.data.results);
      setIsSearching(true);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="search-bar-container">
      <TextField
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.trim() === '') {
            setIsSearching(false);
          }
        }}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        sx={{ width: '100%', maxWidth: '400px' }}
        className="search-bar-input"
      />
      <IconButton onClick={handleSearch} color="primary" className="search-icon">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;

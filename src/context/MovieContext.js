import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

const API_KEY = process.env.REACT_APP_TMDB_KEY;

export const MovieProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem('lastSearch') || '';
  });

  // Fetch trending movies
  const fetchTrendingMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      setTrending(res.data.results);
    } catch (err) {
      console.error('Error fetching trending movies', err);
    }
  };

  // Search movies
  const searchMovies = async (query) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setSearchResults(res.data.results);
      setLastSearch(query);
      localStorage.setItem('lastSearch', query);
    } catch (err) {
      console.error('Error searching movies', err);
    }
  };

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trending,
        searchResults,
        searchMovies,
        favorites,
        setFavorites,
        lastSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

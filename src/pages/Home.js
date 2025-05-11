// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import './Home.css';  // Import external CSS

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchTrendingMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      setMovies(res.data.results);
    } catch (error) {
      console.error('Failed to fetch trending movies:', error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <Box className="home-container" sx={homeContainerStyle}>
      <SearchBar setMovies={setMovies} setIsSearching={setIsSearching} />
      <Typography variant="h4" className="page-title" sx={pageTitleStyle}>
        {isSearching ? 'Search Results' : 'Trending Movies'}
      </Typography>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const homeContainerStyle = {
  background: 'linear-gradient(135deg, #1f1f1f, #2b2b2b)',
  padding: '2rem',
  minHeight: '100vh',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const pageTitleStyle = {
  color: '#0ff',
  textShadow: '0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff',
  fontFamily: 'Orbitron, sans-serif',
  fontWeight: 'bold',
  letterSpacing: 2,
  textAlign: 'center',
  marginBottom: '1.5rem',
};

export default Home;

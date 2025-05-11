import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        background: 'linear-gradient(135deg, #1f1f1f, #2b2b2b)',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: 4,
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 'bold',
          textShadow: '0 0 10px #0ff, 0 0 20px #0ff',
        }}
      >
        Your Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mt: 6,
            fontSize: '1.2rem',
            color: '#ccc',
          }}
        >
          No favorite movies added yet.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;

// src/pages/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = '224982ebeac8852c7efdd85aec4e350f';


  useEffect(() => {
    const fetchDetails = async () => {
      console.log("Movie ID:", id);

      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`;

        console.log("Fetching URL:", url);

        const res = await axios.get(url);
        console.log("Fetched movie data:", res.data);

        setMovie(res.data);
      } catch (err) {
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="error">Failed to load movie details.</Typography>
      </Box>
    );
  }

  const trailer = movie.videos?.results?.find((v) => v.type === "Trailer");

  return (
    <Box
  sx={{
    p: 4,
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 4,
    bgcolor: '#0d1117',
    color: '#c9d1d9',
    minHeight: '100vh',
  }}
>
  <Box>
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      style={{
        width: '100%',
        maxWidth: '300px',
        borderRadius: '16px',
        boxShadow: '0 0 15px #0ff',
      }}
    />
  </Box>

  <Box sx={{ flex: 1 }}>
    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#58a6ff' }}>
      {movie.title}
    </Typography>

    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
      {movie.overview}
    </Typography>

    <Typography sx={{ mb: 1 }}><strong>🎭 Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}</Typography>
    <Typography sx={{ mb: 1 }}><strong>⭐ Rating:</strong> {movie.vote_average}</Typography>

    <Typography sx={{ mt: 3, mb: 1 }}><strong>👥 Top Cast:</strong></Typography>
    <ul>
      {movie.credits?.cast?.slice(0, 5).map(actor => (
        <li key={actor.id}>{actor.name} as {actor.character}</li>
      ))}
    </ul>

    {trailer && (
      <Box mt={4}>
        <Typography variant="h6" gutterBottom sx={{ color: '#58a6ff' }}>🎬 Trailer:</Typography>
        <Box
          component="iframe"
          width="100%"
          height="600px"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube trailer"
          allowFullScreen
          sx={{ borderRadius: '12px', border: '2px solid #58a6ff' }}
        />
      </Box>
    )}
  </Box>
</Box>

  );
};

export default MovieDetails;

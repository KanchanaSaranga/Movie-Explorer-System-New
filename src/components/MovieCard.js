import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'; // Import external CSS
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent Link navigation
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      favorites.push(movie);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie-card">
      <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
        <IconButton className="favorite-icon" onClick={toggleFavorite}>
          {isFavorite ? <StarIcon sx={{ color: '#FFD700' }} /> : <StarBorderIcon sx={{ color: '#fff' }} />}
        </IconButton>
      </Tooltip>

      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-image"
          />
        </div>
        <div className="movie-card-details">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-release-date">{movie.release_date}</p>
          <p className="movie-rating">⭐ {movie.vote_average}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

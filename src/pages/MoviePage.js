import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MoviePage = () => {
  const { id } = useParams(); // Movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    // Fetch movie details from TMDb API
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    // Fetch movie trailer from TMDb API
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        const trailer = response.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setTrailer(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie trailer:', error);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</p>

      <p><strong>Cast:</strong></p>
      <ul>
        {movie.cast && movie.cast.slice(0, 5).map((actor) => (
          <li key={actor.cast_id}>{actor.name} as {actor.character}</li>
        ))}
      </ul>

      {trailer && (
        <div className="movie-trailer">
          <h3>Watch Trailer:</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MoviePage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';
import './MovieDetails.css';


const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      const fetchMovie = async () => {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=263d22d8`);
        const data = await response.json();
        setMovie(data);
      };
      fetchMovie();
    }, [id]);
  
    if (!movie) {
      return <div>Loading...</div>;
    }
    const { Title, Year, Rated, Runtime, Director, Plot, Poster } = movie;
    return (
        <div className="movie-container">
          {movie && (
            <div className="movie-details">
              <div className="movie-info">
                <div className="movie-poster">
                <div style={{position: 'relative'}}>
                  <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                  <p className='rounded' style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    margin: 0,
                    backgroundColor: 'rgba(255, 255, 100, 0.5)',
                    padding: '5px'
                  }}>{`${movie.Year}`}</p>
                </div>

                  <div className="movie-overlay">
                    <h1>{movie.Title}</h1>
                    <p>{`Rated: ${movie.Rated}`}</p>
                    <p>{`IMDb Rating: ${movie.imdbRating}`}</p>
                  </div>
                </div>
              </div>
              <div className="comment-section">
                <CommentSection movieId={id} />
              </div>
            </div>
          )}
        </div>
      );
    };
  
export default MovieDetails;

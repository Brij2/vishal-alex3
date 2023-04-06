import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';

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

  function getRatingStars(rating) {
    const numStars = Math.round(parseFloat(rating) / 2.0);
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < numStars) {
        stars += `<i class="fas fa-star"></i>`; // filled star
      } else {
        stars += `<i class="far fa-star"></i>`; // empty star
      }
    }
    return stars;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card movie-card h-100">
            <div className="card-body d-flex flex-column">
              <div className="movie-details">
                <div className="movie-info">
                  <div className="movie-poster">
                    <div style={{ position: 'relative' }}>
                      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                      <p
                        className="rounded"
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          margin: 0,
                          backgroundColor: 'rgba(255, 255, 100, 0.5)',
                          padding: '5px',
                        }}
                      >
                        {`${movie.Year}`}
                      </p>
                    </div>

                    <div className="movie-overlay ">
                      <h1>{movie.Title}</h1>
                    </div>
                  </div>
                  <div
                    className="container px-4"
                    style={{ margin: '0px', padding: '0px', display: 'flex', flexdirection: 'row' }}
                  >
                  <span class="rating-containers" style={{ display: 'flex', flexdirection: 'row'}}>
                    <h5 class="rating-label">Rate this Movie &nbsp;</h5>
                    <div class="" dangerouslySetInnerHTML={{ __html: getRatingStars(movie.imdbRating) }}></div>
                  </span>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card comment-card h-100">
            <div className="card-body">
              <h5 className="card-title">Comment Section</h5>
              <div className="comment-section">
                <CommentSection movieId={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

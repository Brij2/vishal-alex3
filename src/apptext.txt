import { useState, useEffect } from "react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
// import MovieCard from './components/MovieCard';
import Allmovies from './components/Allmovies';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import MovieDetails from "./components/MovieDetails";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const getMovieRequest = async (searchTerm) => {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=263d22d8`;
    console.log('urllllllLLLLLLLLLLL:',url)

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchTerm);
  }, [searchTerm]);

  const getMovieOnSearch = (MySearchMovies) => {
    setMovies(MySearchMovies);
  };

  return (
    <BrowserRouter>
      <Navbar myMovies={getMovieOnSearch} />
      <div className="container-fluid" style={{ padding: "0 50px" }}>
        <Routes>
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route
            exact
            path="/"
            element={
              <Allmovies
                movies={movies}
              />
            }
          />
          <Route path="/movies/:id" element={<MovieDetails/>} />
        </Routes>
      </div>
      <Footer updateMovies={setMovies} />
    </BrowserRouter>
  );
};

export default App;

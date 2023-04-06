import { useState, useEffect } from "react";
import React from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";

import Navbar from './components/Navbar';
// import MovieCard from './components/MovieCard';
import Allmovies from './components/Allmovies';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import MovieDetails from "./components/MovieDetails";
import SignInPage from "./components/SignInPage";
import SignUpPage from './components/SignUpPage'
import bcrypt from "bcryptjs";
import userPics from './Assets/Profile/profile-pic.png'

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLogin,setIsLogin]=useState(false)
  const [movies, setMovies] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {
      username: "Guest",
      avatarUrl: userPics,
    }
  );



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

  // ------
  const handleSignIn = (credentials) => {
    try {
      const usersData = JSON.parse(localStorage.getItem("users")) || [];
      const user = usersData.find((u) => u.username === credentials.username);

      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        

      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while signing in. Please try again.");
    }
  };

  const handleSignUp = (userData) => {
    try {
      const usersData = JSON.parse(localStorage.getItem("users")) || [];

      if (usersData.some((u) => u.username === userData.username)) {
        alert("User already exists. Please choose a different username.");
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(userData.password, salt);
      const newUser = {
        avatarUrl: userData.avatarUrl,
        username: userData.username,
        password: hashedPassword,
      };
      usersData.push(newUser);
      localStorage.setItem("users", JSON.stringify(usersData));
      alert("signup success")
    } catch (error) {
      console.error(error);
      alert("An error occurred while signing up. Please try again.");
    }
  };
  // -----------
  return (
    <BrowserRouter>
      <Navbar myMovies={getMovieOnSearch} user={currentUser.username} pics={currentUser.avatarUrl} />
      <div className="container-fluid" style={{ padding: "0 50px" }}>
        <Routes>
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          
          <Route
            exact
            path="/all"
            element={
              <Allmovies
                movies={movies}
              />
            }
          />
          <Route path="/movies/:id" element={<MovieDetails/>} />
          <Route path="/signin" element={ <SignInPage  onSignIn={handleSignIn} />} />
          <Route path="/" element={ <SignUpPage onSignUp={handleSignUp} />} />
        </Routes>
      </div>
      <Footer updateMovies={setMovies} />
    </BrowserRouter>
  );
};

export default App;

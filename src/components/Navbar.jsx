import React ,{useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../Assets/Nav/search.png'
import allMovies from '../Assets/Nav/aimovie-logo.png'
import profile from '../Assets/Nav/alex-pic.png'
import heart from '../Assets/Nav/heart.png'
const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";
// import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = (props) => {
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
  // ---------


  const getMovieRequest = async (searchTerm) => {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchTerm);
    props.myMovies(movies)
  }, [searchTerm]);
  // ---------

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: "0 50px" }}>
      <div className="container-fluid" style={{ maxWidth: "100vw" }}>
        <Link to="/" className="navbar-brand">
          <img src={allMovies} alt="logoo" className="d-inline-block align-top me-2" />
          {/* <Link>Logo Name</Link> */}
        </Link>
        <form className="d-flex ms-auto">
          {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button> */}

    {/* ---------- */}
      <div className="container search px-4 ">
      <img className='px-0'
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
        <input className='rounded-pill px-2'
          // set logo inside tect box
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
        />
        
      </div>
    {/* ---------- */}
          
        </form>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav" style={{ marginLeft: "auto" }}>
          
          <div className="navbar-user d-flex align-items-center">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 " style={{ marginRight: "50px" }}>
            <li className="nav-item px-4">
              <Link to="/" className="nav-Link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about px-4" className="nav-Link">About</Link>
            </li>
            <li className="nav-item px-4">
              <Link to="/contact" className="nav-Link">Contact</Link>
            </li>
          </ul>

          <img src={heart} alt="user" className="rounded-circle me-2" />
            <img src={profile} alt="user" className="rounded-circle me-2" />
            <Link>Guest</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

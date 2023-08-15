import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { MovieList } from "./components/MovieList";
import { Heading } from "./components/Heading";
import SearchBox from "./components/SearchBox";
import { AddFavorites } from "./components/AddFavorites";
import { RemoveFavorites } from "./components/RemoveFavorites";

function App() {

  const [movies, setMovies] = useState([])
  const [favorites,setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')

const getMovieList = async(searchValue) => {
  const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=c91c172e`

  const response = await fetch(url)

  const responseJson = await response.json()

if(responseJson.Search){
  setMovies(responseJson.Search)
}
  
}

useEffect(() => {
  getMovieList(searchValue)
},[searchValue])

useEffect(() => {
  const moveFavorites = JSON.parse(localStorage.getItem('movie-favorites'))

  setFavorites(moveFavorites)
},[])

const saveToLocalStorage = (items) => {
  localStorage.setItem('movie-favorites',JSON.stringify(items))
}

const addFavoriteMovie = (movie) =>{

  // creates a new array with all your favorite movies added
  const newFavoriteMovie = [...favorites, movie]
  setFavorites(newFavoriteMovie)
  saveToLocalStorage(newFavoriteMovie)
}

const removeFavoriteMovie = (movie) => {
  const newFavoriteMovie = favorites.filter(
    (favorites) => favorites.imdbID !== movie.imdbID
  )
  setFavorites(newFavoriteMovie)
  saveToLocalStorage(newFavoriteMovie)
}

  return (
    <div className="container-fluid  movie-app" >
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
      <MovieList movies={movies} handleFavoriteClick={addFavoriteMovie} favoriteComponent={AddFavorites}/>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading="Favorites"/>
        </div>
        <div className="row">
      <MovieList movies={favorites} handleFavoriteClick={removeFavoriteMovie} favoriteComponent={RemoveFavorites}/>
      </div>
    </div>
  );
}

export default App;

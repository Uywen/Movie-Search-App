import React from 'react'


export const MovieList = (props) => {

  const FavoriteComponent = props.favoriteComponent
  return (
    <>
    {props.movies.map((movie,index) => (
    <div className='image-container d-flex justify-content-start m-3'>
        
        <img className='img' src={movie.Poster} alt='poster'/>
        <div onClick={() => props.handleFavoriteClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
          <FavoriteComponent />
        </div>
    </div>
    ))}
    </>
  )
}

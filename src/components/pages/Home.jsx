import React from 'react';
import { Link } from 'react-router-dom';
import { movieType, tvType } from '../../api/tmdbApi';
import { OutLineButton } from '../button/Button';


import SlideShow from '../Slide/SlideShow';
import { category } from '../../api/tmdbApi';
import MoviesList from '../movie-list/Movieslist';

function Home() {
  return (
    <>
      <SlideShow/>
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to={"/movie"}>
              <OutLineButton className="small">View more</OutLineButton>
            </Link>
          </div>
          <MoviesList category ={category.movie} type={movieType.popular}/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rate Movie</h2>
            <Link to={"/movie"}>
              <OutLineButton className="small">View more</OutLineButton>
            </Link>
          </div>
          <MoviesList category ={category.movie} type={movieType.top_rated}/>
        </div>
      </div>
      <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to={"/tv"}>
              <OutLineButton className="small">View more</OutLineButton>
            </Link>
          </div>
          <MoviesList category ={category.tv} type={tvType.popular}/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rate TV</h2>
            <Link to={"/tv"}>
              <OutLineButton className="small">View more</OutLineButton>
            </Link>
          </div>
          <MoviesList category ={category.tv} type={tvType.popular}/>
        </div>
    </>
  )
}

export default Home
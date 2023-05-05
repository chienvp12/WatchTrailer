import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import './Movieslist.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';




function MoviesList(props) {
  const [items, setItems] = useState([]);
  const getList = async () => {
    let res = null;
    const params = {};

    if (props.type !== 'similar') {
      switch (props.category) {
        case category.movie:
          res = await tmdbApi.getMovieSList(props.type, { params })
          break;

        default:
          res = await tmdbApi.getTvList(props.type, { params })
      }
    } else {
      res = await tmdbApi.similar(props.category, props.id)
    }
    setItems(res.results);
  }
  useEffect(() => {
    getList();
  },[])


  return (
    <div className='movie-list'>
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        {
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category} />
              {/* <img src={apiConfig.w500Image(item.poster_path)} alt="" /> */}
              {/* <p>{apiConfig.w500Image(item.poster_path)}</p> */}

            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}


MoviesList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default MoviesList;
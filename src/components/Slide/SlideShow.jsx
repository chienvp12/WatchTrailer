import React, {useEffect, useState, useRef} from 'react'
import tmdbApi, {category, movieType} from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './SlideShow.css';
import SwiperCore, { Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import { useHistory } from 'react-router-dom';

import Modal, {ModalContent} from '../modal/Modal';
import Button, { OutLineButton } from '../button/Button';

// import Button, { OutLineButton } from '../button/Button';

function SlideShow() {
    SwiperCore.use([Autoplay]);
    const [moviveItem, setMoviveItem] = useState([]);
    
    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            
            
            try {
                const response = await tmdbApi.getMovieSList(movieType.popular, {params});
                setMoviveItem(response.results.slice(1, 4));
                // console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);
  return (
    <div className='slide-show'>
        <Swiper
             modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            // autoplay={{delay: 2000}}
        >
            {
               moviveItem.map((item, i) =>(
                <SwiperSlide key={i}>
                    {({ isActive }) => (
                        <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                     )}
                </SwiperSlide>
               ))
            }
        </Swiper>
        {
            moviveItem.map((item, i) => <TrailerModal key={i} item={item}/>)
        }
    </div>
  )
}

const HeroSlideItem = props =>{
    let history = useHistory();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    const setModalActive = async() =>{
        const modal = document.querySelector(`#modal_${item.id}`);
        
        const videos = await tmdbApi.getVideos(category.movie, item.id);
        if(videos.results.length > 0){
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key ;
           
             modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
            console.log(videoSrc);
        }else{
            modal.querySelector('.modal__content').innerHTML = 'No Trailer';
        }
   
        modal.classList.toggle('active')
    }
    return(
        <div className={`hero-slide__item ${props.className}`} style={{backgroundImage: `url(${background})`}}>
        
            <div className="hero-slide__content container">
                <div className="hero-slide__content-info">
                    <h2 className="title-slide">{item.title}</h2>
                    <div className="overview-slide">{item.overview}</div>
                    <div className="btns-slide">
                        <Button onClick={() => history.push('/movie' + item.id)}>
                            Watch now
                        </Button>
                        <OutLineButton onClick={setModalActive}>
                            Wathch trailer
                        </OutLineButton>
                    </div>
                </div>
                <div className="hero-slide__content-poster">
                    <img  src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props =>{
    const item = props.item;
    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute('src','');
    return(
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
            
            
            <iframe width="100%" height="500px" ref={iframeRef} title="trailer"></iframe>
            
            </ModalContent>
        </Modal>
    )
}


//<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" frameBorder="0" allowFullScreen width="100%" height="500px" ref={iframeRef} title="trailer"></iframe>

export default SlideShow;

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';
function Footer() {
  return (
    <div className='footer' style={{backgroundImage:`url(${bg})`}}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
                <img src={ logo } alt="" />
                <Link to="/">tMovies</Link>
          </div>
        </div>
        <div className="footer__content_menu">
          <div className="footer__content_menu-item">
            <Link to={"/"}>Home</Link>
            <Link to={"/"}>Contact</Link>
            <Link to={"/"}>Term  of services</Link>
            <Link to={"/"}>About us</Link>
          </div>
          <div className="footer__content_menu-item">
            <Link to={"/"}>Live</Link>
            <Link to={"/"}>FAQ</Link>
            <Link to={"/"}>Pretium</Link>
            <Link to={"/"}>Pravacy policy</Link>
          </div>
          <div className="footer__content_menu-item">
            <Link to={"/"}>You must watch</Link>
            <Link to={"/"}>Rencent release</Link>
            <Link to={"/"}>Top IMDB</Link>
            <Link to={"/"}>About us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
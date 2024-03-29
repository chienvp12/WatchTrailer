import React, { useRef, useEffect } from 'react'
import './Header.css';
import logo from '../../assets/tmovie.png';
import { Link, useLocation } from 'react-router-dom';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movies'
    },
    {
        display: 'TV Series',
        path: '/tv'
    },

]

//This hook returns the current location object. This can be useful if you'd like to perform some side effect whenever the current location changes(use )
function Header() {
    const { pathName } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathName);
    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');

            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        };
    }, []);
    return (
        <div ref={headerRef} className="header" >
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">tMovies</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>{e.display}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header;
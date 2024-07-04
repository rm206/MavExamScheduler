import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import UTAImage from '../assets/UTA_Initials_white-orange-star-rgb.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faCalendar, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className="navbar-left">
                <Link to="/">
                    <img src={UTAImage} alt="UTA Logo" className="uta-logo" />
                </Link>
            </div>
            <ul className="navbar-links">
                <li className="nav-link">
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} className="icon-spacing" />
                        Home
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to="/search">
                        <FontAwesomeIcon icon={faSearch} className="icon-spacing" />
                        Search
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to="/calendar">
                        <FontAwesomeIcon icon={faCalendar} className="icon-spacing" />
                        Calendar
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to="/contact">
                        <FontAwesomeIcon icon={faEnvelope} className="icon-spacing" />
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar; 
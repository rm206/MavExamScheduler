import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import UTAImage from '../assets/UTA_Initials_white-orange-star-rgb.png';

// const NavBar = () => {
//     return (
//         <nav className="navbar">
//             <div className="navbar-left">
//                 <img src={UTAImage} alt="UTA Logo" className="uta-logo" />
//             </div>
//             <ul className="navbar-links">
//                 <li>
//                     <Link to="/" className="nav-link">Home</Link>
//                 </li>
//                 <li>
//                     <Link to="/calendar" className="nav-link">Calendar</Link>
//                 </li>
//                 <li>
//                     <Link to="/contact" className="nav-link">Contact</Link>
//                 </li>
//                 <li>
//                     <Link to="/search" className="nav-link">Search</Link>
//                 </li>
//             </ul>
//         </nav>
//     );
// };

const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className="navbar-left">
                <img src={UTAImage} alt="UTA Logo" className="uta-logo" />
            </div>
            <ul className="navbar-links">
                <li className="nav-link">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-link">
                    <Link to="/search">Search</Link>
                </li>
                <li className="nav-link">
                    <Link to="/calendar">Calendar</Link>
                </li>
                <li className="nav-link">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
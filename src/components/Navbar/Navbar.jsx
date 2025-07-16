import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';
import logo from '../../assets/logo.png'; 
import search_icon from '../../assets/search_icon.png'; 

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className='navbar'>
      <Link to="/">
        <img src={logo} alt="DERM-AI Logo" className='logo'/>
      </Link>

      <ul className="navbar-menu">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>

        <li>
          {isHome ? (
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-70}
              className="scroll-link"
            >
              Features
            </ScrollLink>
          ) : (
            <Link to="/#features">Features</Link> // fallback if not on home
          )}
        </li>

        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about">About Us</Link>
        </li>
        <li className={location.pathname === '/contact' ? 'active' : ''}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <img src={search_icon} alt="search icon" />
        <Link to="/login">
          <button>Sign in</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;





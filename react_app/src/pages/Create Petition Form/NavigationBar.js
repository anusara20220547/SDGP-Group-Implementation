import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">Logo</Link>
      <i className='bx bx-menu' id="menu-icon"></i>
      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar; 


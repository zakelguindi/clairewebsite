import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="nyt-header">
      <div className="header-container">
        <div className="header-top-row">
          <div className="header-location">📍 Charleston, SC</div>
          <div className="masthead">
            <h1>Claire's Notes</h1>
            <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="header-contact">
            <span>claire@gmail.com</span><a href="https://www.linkedin.com/in/claire-m-mattes/">LinkedIn</a><a href="#">Linktree</a>
          </div>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/opinion">Opinion</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/timeline">Timeline</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/africa-map">Africa Map</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
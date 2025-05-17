import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="nyt-footer">
      <div className="footer-container">
        <div className="footer-nav">
          <div className="footer-section">
            <h3>News</h3>
            <ul>
              <li>Home Page</li>
              <li>World</li>
              <li>U.S.</li>
              <li>Politics</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Opinion</h3>
            <ul>
              <li>Today's Opinion</li>
              <li>Editorials</li>
              <li>Op-Ed Contributors</li>
              <li>Letters</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li>Maps</li>
              <li>Timelines</li>
              <li>Social Media</li>
              <li>Archives</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© {new Date().getFullYear()} The Claire Times Company</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
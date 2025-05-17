import React from 'react';
import './Home.css';
import TwitterFeed from './TwitterFeed';
import WorldMap from './WorldMap';
import Opinion from './Opinion';

const Home: React.FC = () => {
  return (
    <div className="home-page-grid">
      {/* Top area for homepage title or banner can be handled by Header component */}
      <div className="home-main-row">
        <div className="home-col left-col">
          <TwitterFeed />
        </div>
        <div className="home-col center-col">
          <div className="top-headlines-section">
            <h2>Top Headlines</h2>
            {/* Placeholder for headlines, can be replaced with a Headlines component */}
            <ul className="headlines-list">
              <li>Major policy changes announced today that will affect global markets.</li>
              <li>Interview with the Secretary of State on new diplomatic initiatives.</li>
              <li>Scientists discover new potential treatment for cancer.</li>
            </ul>
          </div>
          <div className="refugee-map-section">
            <h2>Refugee News Map</h2>
            <WorldMap />
          </div>
        </div>
        <div className="home-col right-col">
          <div className="key-features-section">
            <h2>Key Features</h2>
            <ul className="features-list">
              <li>Timeline of Major Events</li>
              <li>Interactive Maps</li>
              <li>Expert Analysis</li>
            </ul>
          </div>
          <div className="op-eds-section">
            <h2>Op-Eds</h2>
            <Opinion vertical={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Opinion from './components/Opinion';
import WorldMap from './components/WorldMap';
import Timeline from './components/Timeline';
import TwitterFeed from './components/TwitterFeed';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import AfricaMap from './components/AfricaMap';
import ProjectsPage from './components/ProjectsPage';
import Project from './components/Project';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/opinion" element={<Opinion />} />
            <Route path="/map" element={<WorldMap />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/africa" element={<AfricaMap />} />
            <Route path="/africa-map" element={<AfricaMap />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

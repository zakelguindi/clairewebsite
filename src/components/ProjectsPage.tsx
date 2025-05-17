import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectsPage.css';

const projects = [
  {
    id: 1,
    name: 'Featured Project',
    description: 'This is the main featured project. It has a longer description and a prominent image.',
    image: '',
    location: 'Charleston, SC',
    link: '#',
  },
  {
    id: 2,
    name: 'Project Two',
    description: 'Short description for project two.',
    image: '',
    link: '#',
  },
  {
    id: 3,
    name: 'Project Three',
    description: 'Short description for project three.',
    image: '',
    link: '#',
  },
  {
    id: 4,
    name: 'Project Four',
    description: 'Short description for project four.',
    image: '',
    link: '#',
  },
  {
    id: 5,
    name: 'Project Five',
    description: 'Short description for project five.',
    image: '',
    link: '#',
  },
  {
    id: 6,
    name: 'Project Six',
    description: 'Short description for project six.',
    image: '',
    link: '#',
  },
];

const ProjectsPage: React.FC = () => {
  const featured = projects[0];
  const gridProjects = projects.slice(1);

  return (
    <div className="projects-page-container">

      <section className="projects-featured">
        <div className="projects-featured-image">
          <div className="projects-image-placeholder" />
        </div>
        <div className="projects-featured-info">
          <h2>{featured.name}</h2>
          <p>{featured.description}</p>
        </div>
      </section>
      <section className="projects-grid-section">
        <div className="projects-grid">
          {gridProjects.map((proj) => (
            <Link to={`/projects/${proj.id}`} className="project-card" key={proj.id}>
              <div className="project-card-image">
                <div className="projects-image-placeholder" />
              </div>
              <div className="project-card-content">
                <h3>{proj.name}</h3>
                <p>{proj.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage; 
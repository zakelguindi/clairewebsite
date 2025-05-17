import React from 'react';
import { useParams } from 'react-router-dom';
import './Project.css';

const projects = [
  { id: 1, name: 'Featured Project', description: 'This is the main featured project. It has a longer description and a prominent image.', image: '', link: '#' },
  { id: 2, name: 'Project Two', description: 'Short description for project two.', image: '', link: '#' },
  { id: 3, name: 'Project Three', description: 'Short description for project three.', image: '', link: '#' },
  { id: 4, name: 'Project Four', description: 'Short description for project four.', image: '', link: '#' },
  { id: 5, name: 'Project Five', description: 'Short description for project five.', image: '', link: '#' },
  { id: 6, name: 'Project Six', description: 'Short description for project six.', image: '', link: '#' },
];

const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === Number(id)) || projects[0];
  const otherProjects = projects.filter(p => p.id !== project.id);

  return (
    <div className="project-detail-page">
      <header className="project-detail-header">
        <h1>{project.name}</h1>
      </header>
      <div className="project-detail-layout">
        <div className="project-detail-main">
          <div className="project-detail-image">
            <div className="projects-image-placeholder" />
          </div>
          <div className="project-detail-description">
            <p>{project.description}</p>
            <p>More details about the project can go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.</p>
          </div>
        </div>
        <aside className="project-detail-sidebar">
          <h2>Other Projects</h2>
          <div className="project-sidebar-list">
            {otherProjects.map(p => (
              <div className="project-sidebar-card" key={p.id}>
                <div className="project-sidebar-image projects-image-placeholder" />
                <div className="project-sidebar-title">{p.name}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Project; 
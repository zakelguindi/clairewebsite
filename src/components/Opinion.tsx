import React from 'react';
import './Opinion.css';

const opEds = [
  {
    id: 1,
    title: 'The Future of Global Governance in an Uncertain World',
    author: 'Jane Smith',
    date: 'April 15, 2023',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis, magna in scelerisque venenatis... ',
    image: '',
  },
  {
    id: 2,
    title: 'Rethinking Education in the Digital Age',
    author: 'John Doe',
    date: 'May 2, 2023',
    excerpt: 'Suspendisse potenti. Sed aliquet turpis eu justo bibendum. Proin tempus mauris vel lectus iaculis... ',
    image: '',
  },
  {
    id: 3,
    title: 'The Economics of Climate Change',
    author: 'Sarah Johnson',
    date: 'June 10, 2023',
    excerpt: 'Proin tempus mauris vel lectus iaculis, vel malesuada. Integer id enim dui. Fusce tristique tincidunt urna... ',
    image: '',
  },
  {
    id: 4,
    title: "Technology's Impact on Modern Democracy",
    author: 'Thomas Wilson',
    date: 'July 8, 2023',
    excerpt: 'Integer id enim dui. Fusce tristique tincidunt urna. Pellentesque habitant morbi tristique senectus... ',
    image: '',
  },
  {
    id: 5,
    title: 'The Art of Diplomacy in a Divided World',
    author: 'Emily Clark',
    date: 'August 21, 2023',
    excerpt: 'Nam tempor gravida nulla in aliquam. Nullam vel tincidunt metus, id finibus ante. Etiam ultrices sem... ',
    image: '',
  },
  {
    id: 6,
    title: 'Social Media and Public Discourse',
    author: 'Michael Brown',
    date: 'September 12, 2023',
    excerpt: 'Cras molestie quam vitae elit mollis, at consequat purus elementum. Etiam ultrices sem in enim porta... ',
    image: '',
  },
];

const Opinion: React.FC<{ vertical?: boolean }> = ({ vertical = false }) => {
  const featured = opEds[0];
  const gridOpEds = opEds.slice(1);

  return (
    <div className="opeds-page-container">
      <header className="opeds-header">
        <h1>Op Eds</h1>
      </header>
      <section className="opeds-featured">
        <div className="opeds-featured-text">
          <h2>{featured.title}</h2>
          <p className="opeds-featured-author">By {featured.author} | {featured.date}</p>
          <p className="opeds-featured-excerpt">{featured.excerpt}</p>
        </div>
        <div className="opeds-featured-image">
          <div className="opeds-image-placeholder" />
        </div>
      </section>
      <section className="opeds-grid-section">
        <div className={`opeds-grid${vertical ? ' vertical' : ''}`}>
          {gridOpEds.map((op) => (
            <div className="opeds-card" key={op.id}>
              <div className="opeds-card-image">
                <div className="opeds-image-placeholder" />
              </div>
              <div className="opeds-card-content">
                <h3>{op.title}</h3>
                <p className="opeds-card-author">By {op.author} | {op.date}</p>
                <p className="opeds-card-excerpt">{op.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Opinion; 
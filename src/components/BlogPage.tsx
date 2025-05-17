import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';

const blogPosts = [
  { id: 1, title: 'Post 1 Title', excerpt: 'This is a preview of the first blog post. It has a short summary...' },
  { id: 2, title: 'Post 2 Title', excerpt: 'This is a preview of the second blog post. It has a short summary...' },
  { id: 3, title: 'Post 3 Title', excerpt: 'This is a preview of the third blog post. It has a short summary...' },
];

const BlogPage: React.FC = () => {
  return (
    <div className="blog-page-container">
      <header className="blog-header">
        <h1>Blog Forum</h1>
      </header>
      <div className="blog-list">
        {blogPosts.map(post => (
          <Link to={`/blog/${post.id}`} className="blog-preview" key={post.id}>
            <h2 className="blog-preview-title">{post.title}</h2>
            <p className="blog-preview-excerpt">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage; 
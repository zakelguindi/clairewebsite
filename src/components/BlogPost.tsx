import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPost.css';

const blogPosts = [
  {
    id: 1,
    title: 'Post 1 Title',
    author: '@claire',
    content: 'This is the full content of the first blog post.\nIt has multiple lines and paragraphs.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.',
    upvotes: 24,
    comments: [
      { id: 1, author: 'Anon', text: 'Great post!', upvotes: 3, downvotes: 0 },
      { id: 2, author: 'Anon', text: 'I disagree with some points.', upvotes: 1, downvotes: 3 },
    ],
  },
  {
    id: 2,
    title: 'Post 2 Title',
    author: '@claire',
    content: 'This is the full content of the second blog post.\nAnother paragraph here.\nMore text for the post.',
    upvotes: 12,
    comments: [
      { id: 1, author: 'Anon', text: 'Interesting perspective.', upvotes: 2, downvotes: 0 },
    ],
  },
  {
    id: 3,
    title: 'Post 3 Title',
    author: '@claire',
    content: 'This is the full content of the third blog post.\nYet another paragraph.\nEven more text.',
    upvotes: 7,
    comments: [],
  },
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === Number(id));
  const [upvotes, setUpvotes] = useState(post ? post.upvotes : 0);
  const [comments, setComments] = useState(post ? post.comments : []);

  const handleUpvote = () => setUpvotes(u => u + 1);
  const handleDownvote = () => setUpvotes(u => u - 1);

  const handleCommentUpvote = (commentId: number) => {
    setComments(comments => comments.map(c => c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c));
  };
  const handleCommentDownvote = (commentId: number) => {
    setComments(comments => comments.map(c => c.id === commentId ? { ...c, downvotes: c.downvotes + 1 } : c));
  };

  if (!post) return <div className="blog-post-not-found">Post not found.</div>;

  return (
    <div className="blog-post-container">
      <header className="blog-post-header">
        <h1>Blog Post</h1>
      </header>
      <div className="blog-post-content">
        <h2>{post.title}</h2>
        <p className="blog-post-author">{post.author}</p>
        <div className="blog-post-body">
          {post.content.split('\n').map((line, idx) => <p key={idx}>{line}</p>)}
        </div>
        <div className="blog-post-votes">
          <button className="upvote-btn" onClick={handleUpvote}>⬆️</button>
          <span className="vote-count" style={{ color: upvotes >= 0 ? 'green' : 'red' }}>{upvotes}</span>
          <button className="downvote-btn" onClick={handleDownvote}>⬇️</button>
        </div>
        <div className="blog-post-comments">
          <h3>Comments</h3>
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map(comment => (
            <div className="comment" key={comment.id}>
              <span className="comment-author">{comment.author}</span>
              <span className="comment-text">{comment.text}</span>
              <div className="comment-votes">
                <button className="comment-upvote-btn" onClick={() => handleCommentUpvote(comment.id)}>⬆️</button>
                <span className="comment-vote-count" style={{ color: comment.upvotes >= comment.downvotes ? 'green' : 'red' }}>{comment.upvotes - comment.downvotes}</span>
                <button className="comment-downvote-btn" onClick={() => handleCommentDownvote(comment.id)}>⬇️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 
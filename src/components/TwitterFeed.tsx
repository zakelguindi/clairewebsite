import React from 'react';
import './TwitterFeed.css';

const TwitterFeed: React.FC = () => {
  // Sample tweets
  const tweets = [
    {
      id: 1,
      username: '@TheClaireTimes',
      name: 'The Claire Times',
      profilePic: '',
      content: 'Breaking: Major policy changes announced today that will affect global markets. Read our analysis: #BreakingNews #GlobalEconomy',
      timestamp: '2h ago',
      likes: 245,
      retweets: 87,
      comments: 36
    },
    {
      id: 2,
      username: '@ClairePolitics',
      name: 'Claire Politics',
      profilePic: '',
      content: 'Watch our interview with the Secretary of State discussing the latest diplomatic initiatives across the Middle East and Asia.',
      timestamp: '4h ago',
      likes: 183,
      retweets: 62,
      comments: 24
    },
    {
      id: 3,
      username: '@ClaireScience',
      name: 'Claire Science',
      profilePic: '',
      content: 'Scientists discover new potential treatment for cancer that shows promising results in early clinical trials. #MedicalBreakthrough',
      timestamp: '6h ago',
      likes: 521,
      retweets: 312,
      comments: 58
    },
    {
      id: 4,
      username: '@ClaireOpinion',
      name: 'Claire Opinion',
      profilePic: '',
      content: 'New op-ed from Professor Johnson on the changing landscape of international relations in the wake of recent global events.',
      timestamp: '8h ago',
      likes: 167,
      retweets: 45,
      comments: 21
    },
    {
      id: 5,
      username: '@ClaireTech',
      name: 'Claire Technology',
      profilePic: '',
      content: 'The latest advancements in artificial intelligence are reshaping industries worldwide. Our tech correspondent reports on the implications.',
      timestamp: '12h ago',
      likes: 298,
      retweets: 103,
      comments: 47
    }
  ];

  return (
    <div className="twitter-feed-container">
      <div className="twitter-header">
        <h2>Latest Updates</h2>
        <p className="twitter-subtitle">Follow our coverage on social media</p>
      </div>
      
      <div className="twitter-feed">
        {tweets.map(tweet => (
          <div key={tweet.id} className="tweet">
            <div className="tweet-profile">
              <div className="profile-pic-placeholder"></div>
              <div className="profile-info">
                <span className="profile-name">{tweet.name}</span>
                <span className="profile-username">{tweet.username}</span>
              </div>
              <span className="tweet-timestamp">{tweet.timestamp}</span>
            </div>
            
            <div className="tweet-content">
              {tweet.content}
            </div>
            
            <div className="tweet-actions">
              <div className="tweet-action">
                <span className="action-icon">💬</span>
                <span className="action-count">{tweet.comments}</span>
              </div>
              <div className="tweet-action">
                <span className="action-icon">🔄</span>
                <span className="action-count">{tweet.retweets}</span>
              </div>
              <div className="tweet-action">
                <span className="action-icon">❤️</span>
                <span className="action-count">{tweet.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwitterFeed; 
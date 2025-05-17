import React, { useState } from 'react';
import './Timeline.css';

const timelineEvents = [
  {
    id: 1,
    year: 2002,
    date: 'January 15, 2002',
    title: 'Major Policy Announcement',
    description: 'Details of the policy and its implications for various stakeholders.',
    image: '',
  },
  {
    id: 2,
    year: 2008,
    date: 'February 28, 2008',
    title: 'International Summit',
    description: 'Leaders from around the world gathered to discuss pressing global issues.',
    image: '',
  },
  {
    id: 3,
    year: 2012,
    date: 'April 10, 2012',
    title: 'Technological Breakthrough',
    description: 'Scientists announce a significant advancement in renewable energy technology.',
    image: '',
  },
  {
    id: 4,
    year: 2016,
    date: 'June 22, 2016',
    title: 'Cultural Milestone',
    description: 'Celebration of an important historical anniversary with events worldwide.',
    image: '',
  },
  {
    id: 5,
    year: 2020,
    date: 'August 5, 2020',
    title: 'Economic Development',
    description: 'New trade agreements signed between major economic powers.',
    image: '',
  },
  {
    id: 6,
    year: 2023,
    date: 'October 17, 2023',
    title: 'Scientific Discovery',
    description: 'Researchers publish findings on a groundbreaking medical treatment.',
    image: '',
  },
  {
    id: 7,
    year: 2025,
    date: 'December 3, 2025',
    title: 'Environmental Initiative',
    description: 'Launch of a global program to address climate change challenges.',
    image: '',
  },
];

const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState(timelineEvents[0]);

  return (
    <div className="timeline-page-grid">
      <div className="timeline-left-col">
        <div className="timeline-vertical">
          <div className="timeline-years">
            <span>{timelineEvents[0].year}</span>
            <span>{timelineEvents[timelineEvents.length - 1].year}</span>
          </div>
          <div className="timeline-line">
            {timelineEvents.map((event, idx) => (
              <div
                key={event.id}
                className={`timeline-dot${selectedEvent.id === event.id ? ' active' : ''}`}
                style={{ top: `${(idx / (timelineEvents.length - 1)) * 100}%` }}
                onClick={() => setSelectedEvent(event)}
                title={event.title}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="timeline-right-col">
        <div className="timeline-event-details">
          <h2>{selectedEvent.title}</h2>
          <p className="timeline-event-date">{selectedEvent.date}</p>
          <p>{selectedEvent.description}</p>
          {/* Placeholder for image and related content */}
          <div className="timeline-event-image-placeholder" />
          <div className="timeline-event-related">
            <h4>Related Content</h4>
            <ul>
              <li>Analysis</li>
              <li>Photos</li>
              <li>Documents</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline; 
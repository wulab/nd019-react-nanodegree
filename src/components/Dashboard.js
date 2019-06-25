import React from 'react';

export default function Dashboard(props) {
  const tweetIds = Object.keys(props.tweets);

  return (
    <div>
      <h3 className="center">Your Timeline</h3>
      <ul>
        {tweetIds.map(id => (
          <li key={id}>Tweet ID: {id}</li>
        ))}
      </ul>
    </div>
  );
}

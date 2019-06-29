import React, { useContext } from 'react';
import { StoreContext } from '../context';
import Tweet from './Tweet';

export default function Dashboard(props) {
  const store = useContext(StoreContext);
  const { tweets } = store.getState();

  return (
    <div>
      <h3 className="center">Your Timeline</h3>
      <ul>
        {Object.keys(tweets)
          .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
          .map(id => (
            <li key={id}>
              <Tweet id={id} />
            </li>
          ))}
      </ul>
    </div>
  );
}

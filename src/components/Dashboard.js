import React from 'react';
import Tweet from './Tweet';
import { formatTweet } from '../helpers/tweet';

export default function Dashboard(props) {
  const { authUser, tweets, users } = props;

  function getFormattedTweet(id) {
    const tweet = tweets[id];

    if (tweet === null) {
      return null;
    }

    const author = users[tweet.author];
    const parentTweet = tweets[tweet.replyingTo];

    return formatTweet(tweet, author, authUser, parentTweet);
  }

  return (
    <div>
      <h3 className="center">Your Timeline</h3>
      <ul>
        {Object.keys(tweets)
          .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
          .map(id => (
            <li key={id}>
              <Tweet authUser={authUser} tweet={getFormattedTweet(id)} />
            </li>
          ))}
      </ul>
    </div>
  );
}

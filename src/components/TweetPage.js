import React, { useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { StoreContext } from '../context';
import Tweet from './Tweet';
import NewTweet from './NewTweet';

export default function TweetPage(props) {
  const store = useContext(StoreContext);
  const { tweets } = store.getState();
  const { id } = props.match.params;
  const tweet = tweets[id];

  if (tweet === undefined) {
    alert("This Tweet doesn't exist.");
    return <Redirect to="/" />;
  }

  const replies = tweet.replies;

  return (
    <Fragment>
      <Tweet id={id} />
      <NewTweet replyingTo={id} />
      {replies.length > 0 && (
        <Fragment>
          <h3 className="center">Replies</h3>
          <ul>
            {replies
              .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
              .map(id => (
                <li key={id}>
                  <Tweet id={id} />
                </li>
              ))}
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
}

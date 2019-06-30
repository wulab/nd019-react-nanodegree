import React, { useContext, Fragment } from 'react';
import { StoreContext } from '../context';
import Tweet from './Tweet';
import NewTweet from './NewTweet';

export default function TweetPage(props) {
  const store = useContext(StoreContext);
  const { tweets } = store.getState();
  const { replyingTo } = props;
  const replies = tweets[replyingTo].replies;

  return (
    <div>
      <Tweet id={replyingTo} />
      <NewTweet replyingTo={replyingTo} />
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
    </div>
  );
}

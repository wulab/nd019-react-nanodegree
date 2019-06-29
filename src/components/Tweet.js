import React, { useContext } from 'react';
import { StoreContext } from '../context';
import { asyncToggleTweet } from '../actions/tweets';
import { formatTweet, formatDate } from '../helpers/tweet';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from 'react-icons/ti';

export default function Tweet(props) {
  const store = useContext(StoreContext);
  const { id } = props;

  if (id === null) {
    return <div className="tweet" />;
  }

  const { authUser, users, tweets } = store.getState();
  const {
    avatar,
    hasLiked,
    likes,
    name,
    parent,
    replies,
    text,
    timestamp
  } = formatTweet(
    tweets[id],
    users[tweets[id].author],
    authUser,
    tweets[tweets[id].replyingTo]
  );

  function handleReplyingTo(event) {
    event.preventDefault();
  }

  function handleLike(event) {
    event.preventDefault();
    store.dispatch(asyncToggleTweet({ id, hasLiked, authUser }));
  }

  return (
    <div className="tweet">
      <img src={avatar} alt={name} className="avatar" />
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent !== null && (
            <button onClick={handleReplyingTo} className="replying-to">
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
          <TiArrowBackOutline className="tweet-icon" />
          <span>{replies > 0 && replies}</span>
          <button className="heart-button" onClick={handleLike}>
            {hasLiked ? (
              <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
            ) : (
              <TiHeartOutline className="tweet-icon" />
            )}
          </button>
          <span>{likes > 0 && likes}</span>
        </div>
      </div>
    </div>
  );
}

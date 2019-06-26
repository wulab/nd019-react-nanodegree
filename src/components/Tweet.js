import React from 'react';
import { formatDate } from '../helpers/tweet';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from 'react-icons/ti';

export default function Tweet(props) {
  const tweet = props.tweet;

  if (tweet === null) {
    return <div className="tweet" />;
  }

  const {
    avatar,
    hasLiked,
    likes,
    name,
    parent,
    replies,
    text,
    timestamp
  } = tweet;

  function handleReplyingTo(event) {
    event.preventDefault();
  }

  function handleLike(event) {
    event.preventDefault();
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

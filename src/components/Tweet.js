import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { StoreContext } from '../context';
import { asyncToggleTweet } from '../actions/tweets';
import { formatTweet, formatDate } from '../helpers/tweet';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from 'react-icons/ti';

function Tweet(props) {
  const store = useContext(StoreContext);
  const { authUser, users, tweets } = store.getState();
  const { id, history } = props;
  const tweet = tweets[id];

  if (tweet === undefined) {
    return (
      <div className="tweet">
        <div className="tweet-info">This Tweet doesn't exist.</div>
      </div>
    );
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
  } = formatTweet(
    tweet,
    users[tweet.author],
    authUser,
    tweets[tweet.replyingTo]
  );

  function handleReplyingTo(event) {
    event.preventDefault();
    history.push(`/tweet/${parent.id}`);
  }

  function handleLike(event) {
    event.preventDefault();
    store.dispatch(asyncToggleTweet({ id, hasLiked, authUser }));
  }

  return (
    <Link to={`/tweet/${id}`} className="tweet">
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
    </Link>
  );
}

export default withRouter(Tweet);

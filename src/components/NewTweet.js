import React, { useState, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { StoreContext } from '../context';
import { asyncAddTweet } from '../actions/tweets';

export default function NewTweet(props) {
  const [text, setText] = useState('');
  const [redirectBack, setRedirectBack] = useState(false);
  const store = useContext(StoreContext);
  const MAX_LENGTH = 280;
  const remainingLength = MAX_LENGTH - text.length;
  const { replyingTo } = props;

  function handleChange(event) {
    event.preventDefault();
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    store.dispatch(asyncAddTweet({ text, replyingTo }));
    setText('');

    if (replyingTo === undefined) {
      setRedirectBack(true);
    }
  }

  if (redirectBack) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h3 className="center">Compose New Tweet</h3>
      <form className="new-tweet" onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          maxLength={MAX_LENGTH}
          onChange={handleChange}
          placeholder="What's happening?"
          value={text}
        />
        {remainingLength <= 100 && (
          <div className="tweet-length">{remainingLength}</div>
        )}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Fragment>
  );
}

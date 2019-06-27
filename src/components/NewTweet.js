import React, { useState } from 'react';

export default function NewTweet(props) {
  const [text, setText] = useState('');
  const MAX_LENGTH = 280;
  const remainingLength = MAX_LENGTH - text.length;

  function handleChange(event) {
    event.preventDefault();
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log('New Tweet:', text);
    setText('');
  }

  return (
    <div>
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
    </div>
  );
}

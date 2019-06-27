import { saveLikeToggle, saveTweet } from '../api/tweet';

export const ADD_TWEET = 'ADD_TWEET';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  };
}

export function toggleTweet({ id, authUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authUser,
    hasLiked
  };
}

export function asyncAddTweet({ text, replyingTo }) {
  return (dispatch, getState) => {
    const { authUser } = getState();

    saveTweet({
      text,
      replyingTo,
      author: authUser
    }).then(tweet => dispatch(addTweet(tweet)));
  };
}

export function asyncToggleTweet(tweet) {
  return dispatch => {
    dispatch(toggleTweet(tweet));

    saveLikeToggle(tweet).catch(error => {
      console.warn('Error in asyncToggleTweet:', error);
      dispatch(toggleTweet(tweet));
      alert('There was an error. Try again.');
    });
  };
}

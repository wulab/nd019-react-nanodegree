import { saveLikeToggle } from '../api/tweet';

export const TOGGLE_TWEET = 'TOGGLE_TWEET';

export function toggleTweet({ id, authUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authUser,
    hasLiked
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

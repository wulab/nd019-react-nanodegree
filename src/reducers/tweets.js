import { RECEIVE_DATA } from '../actions/shared';
import { ADD_TWEET, TOGGLE_TWEET } from '../actions/tweets';

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.tweets;
    case ADD_TWEET:
      let replyingTo = {};
      let { tweet } = action;

      if (tweet.replyingTo !== null) {
        replyingTo[tweet.replyingTo] = {
          ...state[tweet.replyingTo],
          replies: state[tweet.replyingTo].replies.concat([tweet.id])
        };
      }

      return {
        ...state,
        [tweet.id]: tweet,
        ...replyingTo
      };
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked
            ? state[action.id].likes.filter(user => user !== action.authUser)
            : state[action.id].likes.concat([action.authUser])
        }
      };
    default:
      return state;
  }
}

import { RECEIVE_DATA } from '../actions/shared';
import { TOGGLE_TWEET } from '../actions/tweets';

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.tweets;
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

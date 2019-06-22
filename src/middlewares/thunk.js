export default function thunk(store) {
  return function(next) {
    return function(action) {
      if (typeof action === 'function') {
        return action(store.dispatch);
      }

      return next(action);
    };
  };
}

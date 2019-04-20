function createStore() {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
  };

  return {
    getState,
    subscribe
  };
}

const store = createStore();

store.subscribe(() => console.log('The store changed.'));
store.subscribe(() => console.log(`The new state is: ${store.getState()}`));

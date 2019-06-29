import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../context';
import { asyncReceiveData } from '../actions/shared';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';

export default function App(props) {
  const store = useContext(StoreContext);
  const { authUser } = store.getState();
  const [, setState] = useState();

  useEffect(() => {
    store.dispatch(asyncReceiveData());
    return store.subscribe(() => setState(store.getState()));
  }, [store]);

  return (
    <div className="container">
      {authUser === null ? (
        <h3 className="center">Loading...</h3>
      ) : (
        // <Dashboard />
        <NewTweet />
      )}
    </div>
  );
}

import React, { useState, useContext, useEffect, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StoreContext } from '../context';
import { asyncReceiveData } from '../actions/shared';
import Nav from './Nav';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';

export default function App(props) {
  const store = useContext(StoreContext);
  const { authUser } = store.getState();
  const [, setState] = useState();

  useEffect(() => {
    store.dispatch(asyncReceiveData());
    return store.subscribe(() => setState(store.getState()));
  }, [store]);

  return (
    <BrowserRouter>
      <div className="container">
        {authUser === null ? (
          <h3 className="center">Loading...</h3>
        ) : (
          <Fragment>
            <Nav />
            <Route exact path="/" component={Dashboard} />
            <Route path="/new" component={NewTweet} />
            <Route path="/tweet/:id" component={TweetPage} />
          </Fragment>
        )}
      </div>
    </BrowserRouter>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import middlewares from '../middlewares';
import reducers from '../reducers';
import { StoreContext } from '../contexts/store';

it('renders without crashing', () => {
  const store = createStore(reducers, middlewares);
  const div = document.createElement('div');
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

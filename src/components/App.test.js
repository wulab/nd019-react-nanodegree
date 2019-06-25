import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import reducer from '../reducers';
import middlewares from '../middlewares';
import { StoreContext } from '../context';

it('renders without crashing', () => {
  const store = createStore(reducer, middlewares);
  const div = document.createElement('div');
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

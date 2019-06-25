import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../context';
import { asyncReceiveData } from '../actions/shared';

export default function App(props) {
  const store = useContext(StoreContext);

  useEffect(() => store.dispatch(asyncReceiveData()));

  return (
    <div className="container">
      <h3 className="center">Starter Code</h3>
    </div>
  );
}

import React, { Component } from 'react';
import Goals from './Goals';
import Todos from './Todos';
import { asyncReceiveDataAction } from '../actions/shared';
import { StoreContext } from '../context';

class App extends Component {
  static contextType = StoreContext;

  componentDidMount() {
    const store = this.context;
    store.subscribe(() => this.forceUpdate());
    store.dispatch(asyncReceiveDataAction());
  }

  render() {
    const store = this.context;
    const { todos, goals, loading } = store.getState();

    if (loading) {
      return (
        <div className="container">
          <h1>Loading . . .</h1>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="column column-50">
            <Todos todos={todos} />
          </div>
        </div>
        <div className="row">
          <div className="column column-50">
            <Goals goals={goals} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import ListBooks from './ListBooks';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ListBooks />
      </div>
    );
  }
}

export default App;

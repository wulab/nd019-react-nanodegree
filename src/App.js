import React, { Component } from 'react';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  updateBook = (book, shelf) =>
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll())
      .then(books => this.setState({ books }));

  render() {
    return (
      <div className="app">
        <ListBooks books={this.state.books} onShelfChange={this.updateBook} />
      </div>
    );
  }
}

export default App;

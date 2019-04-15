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

  moveBook = (book, shelf) => {
    const books = this.state.books.filter(b => b.id !== book.id);
    books.push({ ...book, shelf: shelf });
    this.setState({ books });
  };

  render() {
    return (
      <div className="app">
        <ListBooks books={this.state.books} onShelfChange={this.moveBook} />
      </div>
    );
  }
}

export default App;

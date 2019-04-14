import React, { Component } from 'react';
import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title="Currently Reading"
              books={this.props.books.filter(
                book => book.category === 'currentlyReading'
              )}
            />
            <Bookshelf
              title="Want to Read"
              books={this.props.books.filter(
                book => book.category === 'wantToRead'
              )}
            />
            <Bookshelf
              title="Read"
              books={this.props.books.filter(book => book.category === 'read')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;

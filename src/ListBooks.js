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
                book => book.shelf === 'currentlyReading'
              )}
              onShelfChange={this.props.onShelfChange}
            />
            <Bookshelf
              title="Want to Read"
              books={this.props.books.filter(
                book => book.shelf === 'wantToRead'
              )}
              onShelfChange={this.props.onShelfChange}
            />
            <Bookshelf
              title="Read"
              books={this.props.books.filter(book => book.shelf === 'read')}
              onShelfChange={this.props.onShelfChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;

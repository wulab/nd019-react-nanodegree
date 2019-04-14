import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.title}>
                <Book
                  title={book.title}
                  authors={book.authors}
                  category={book.category}
                  cover={book.cover}
                  onCategoryChange={category =>
                    this.props.onBookMove(book, category)
                  }
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;

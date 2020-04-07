import React from 'react'
import { Link } from 'react-router-dom'
import {getAll, update} from '../BooksAPI'
import Shelf from './Shelf'

class BookShelf extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			books: []
		}
	}

	componentDidMount() {
    this.getBooks()
	}

  //get books on loading
  getBooks() {
    getAll().then((data) => {
      this.setState({books: data})
    })
  }

  filterBooks(shelf) {
    return this.state.books.filter((book) => book.shelf === shelf)
  }

  updateBookShelf = (book, shelf) => {
    update(book, shelf)
    // set the shelf for new or updated book
    .then(resp => {
      book.shelf = shelf;
      //update State
      this.setState(prevState => ({
        books: prevState.books
          // remove updated book
          .filter(updatedBook => updatedBook.id !== book.id)
          // add updated book
          .concat([book])
        }));
      });
  }

	render() {
		return (
	    <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <Shelf updateBookShelf={this.updateBookShelf} title="Currently Reading" books={this.filterBooks('currentlyReading')}/>
              <Shelf updateBookShelf={this.updateBookShelf} title="Want To Read" books={this.filterBooks('wantToRead')}/>
              <Shelf updateBookShelf={this.updateBookShelf} title="Read" books={this.filterBooks('read')}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
            </div>
		);
	}
}

export default BookShelf
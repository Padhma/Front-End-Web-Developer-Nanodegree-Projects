import React from 'react'
import { Link } from 'react-router-dom'
import {getAll, update} from '../BooksAPI'

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: props.book
    }
  }

  //categorize the books
  //move the books across the shelves
  //get the title, author and the cover of the book
	render() {
		return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${this.props.book.imageLinks ?
            this.props.book.imageLinks.thumbnail : ''}")`
          }}>
          </div>
          <div className="book-shelf-changer">
            <select value={this.state.book.shelf || "none"} onChange={(events) => { this.props.updateBookShelf(this.props.book, events.target.value) }}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title ? this.props.book.title : "No title for this book"}</div>
        <div className="book-authors">
        {this.props.book.authors ? this.props.book.authors.join(', ') :
        "None"}</div>
      </div>
    </li>
		);
	}
}

export default Book
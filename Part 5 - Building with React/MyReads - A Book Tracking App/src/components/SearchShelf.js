import React from 'react'
import { Link } from 'react-router-dom'
import {search, getAll, update} from '../BooksAPI'
import Book from './Book'

class SearchShelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      query: [],
      keyword: ""
    }
  }

  componentDidMount() {
   this.getBooks()
  }

  // get all books on loading
  getBooks() {
    getAll().then((data) => {
      this.setState({books: data})
    })
  }

  updateBook = (keyword)=> {
      this.setState({keyword: keyword}, this.startSearch);
  }

  //if the user gives input start the search
  startSearch() {
    if(this.state.keyword === '' || this.state.keyword === undefined || this.state.keyword === null) {
        return this.setState({ query: [] });
      }
      search(this.state.keyword.trim()).then(res => {
        //console.log(res);
        if(res.error) {
          return this.setState({ query: [] });
        }
        else {
          res.forEach(obj => {
            let pos = this.state.books.filter(t => t.id === obj.id);
            if (pos[0]) {
              obj.shelf = pos[0].shelf;
            }
          });
          return this.setState({ query: res });
        }
      });
  }

  updateBookShelf = (book, shelf) => {
    update(book, shelf)
    // set the shelf for new or updated book
    .then(resp => {
      book.shelf = shelf;
      // update state
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
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.keyword}
                onChange={(e) => this.updateBook(e.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                this.state.query.map((item, key) =>
                  <Book updateBookShelf={this.updateBookShelf} book={item} key={key} />
              )}
              </ol>
            </div>
          </div>
		);
	}

}

export default SearchShelf
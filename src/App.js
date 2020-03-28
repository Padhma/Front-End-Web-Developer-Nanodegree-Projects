import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchShelf from './components/SearchShelf'

class BooksApp extends React.Component {
    render() {
      return (
      <div>
        <Route exact path='/' component={ BookShelf } />
        <Route exact path='/search' component={ SearchShelf } />
      </div>
    );
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './Shelves'
import { Route } from 'react-router-dom'
import StarterBooksApp from './StarterBooksApp'
import Search from './Search'



class APP extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({books: books})        
    })
  }


  handleUpdate = (book, shelf) => {

      book.shelf = shelf

      const books = this.state.books
      books.filter(b => b.id !== book.id).push(book)

      this.setState({books: books})
      BooksAPI.update(book, shelf) //persist change to Database
      // console.log(this.state)


  } 

  render() {

    return (

      <div className="app">

        <Route exact path="/" render={ ()=> (
          <Shelves  books={this.state.books}  handler={this.handleUpdate}/>
        )} />
     

        {/* This route displays the projects starter static html. */}
        <Route exact path="/starter" render={ ()=> (
          <div>
            <div style={{backgroundColor: "black"}}><h1 style={{ color: "white"}}>StarterBooksApp Component Below</h1></div>
            <StarterBooksApp />
          </div>
        )} />

        <Route path="/search" render= { () => (
          <Search books={this.state.books} handler={this.handleUpdate} />
        )} />

      </div>

      
    )
  }
}



export default APP

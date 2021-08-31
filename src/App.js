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

  async fetchBooks() {
    const books = await BooksAPI.getAll()
    this.setState({books})        
    
  }


  // handleUpdate = (book, shelf) => {

  //     book.shelf = shelf

  //     this.setState(
  //       state => ({
  //         books: state.books.filter(b => b.id !== book.id).concat(book)
  //       })
  //     )

  //     BooksAPI.update(book, shelf) //persist change to Database
  //     // console.log(this.state)


  // } 

  handleUpdate = async (book, shelf) => {
    try {
      const dbBook0 = await BooksAPI.get(book.id)
      console.log(`got book from db... shelf: ${dbBook0.shelf}`)
      console.log(`handle update: old shelf: ${book.shelf} -> new shelf: ${shelf} `)
      book.shelf = shelf
      console.log(`post update shelf: ${book.shelf}`)
      this.setState(
        state => ({
          books: state.books.filter(b => b.id !== book.id).concat(book)
        })
      )
    }
    catch(err) {
      console.log(err)
    }

    finally{
      await BooksAPI.update(book, shelf) //persist change to Database
      const dbBook = await BooksAPI.get(book.id)
      console.log(`got book from db... shelf: ${dbBook.shelf}`)
      // console.log(this.state)

    }
    

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

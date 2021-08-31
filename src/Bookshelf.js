import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

// The Bookshelf component maps over a given array of books and renders a Book component for each book.
// This component can be used to render any array of books, wether that be books on a particular shelf or search results.

class Bookshelf extends React.Component {
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired
    }

    state = {
      books: []
    }
    
    componentDidMount() {
      const booksFromProps = this.props.books
      // console.log(`MOUNT ${this.props.title} - books`, booksFromProps)
      if (booksFromProps!== this.state.books){
          this.setState({books: booksFromProps})
      }
      
      
    }

    componentDidUpdate() {
      const booksFromProps = this.props.books
      // console.log(`UPDATE ${this.props.title} - books`, booksFromProps)
      if (booksFromProps!== this.state.books){
          this.setState({books: booksFromProps})
      }
      
      
    }

    render () {
      return (
        
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.books.map( (book) => (<Book key={book.id} data={book} handler={this.props.handler}/>))}
            </ol>
          </div>
        </div>
  
      )
    }
}

export default Bookshelf
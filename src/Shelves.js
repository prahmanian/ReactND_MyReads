import React from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


// The Shelves component is the parent component of the root "/" route of our app.
// This component renders a header and navigation buttons along with a Bookshelf component
// for each classification of books: Currently Reading, Want to Read, Read, and Not on a Bookshelf.

class Shelves extends React.Component {
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        handler: PropTypes.func.isRequired
    }

    
    render () {

        // New arrays are declared for each shelf.
        // A for loop is used to filter the books into the seperate arrays to pass to the Bookshelf Components.
        // The for loop was used over individual .filter methods to optimize performance. 

        const booksCurrentlyReading = []
        const booksRead= []
        const booksWantToRead= []
        const booksUncategorized=[]
        
        for (const book of this.props.books) {

          switch (book.shelf) {
            case "currentlyReading":
                booksCurrentlyReading.push(book)
                break
            case "wantToRead":
                booksWantToRead.push(book)
                break
            case "read":
                booksRead.push(book)
              break
            case 'none':
                booksUncategorized.push(book)
                break
            default:
              booksUncategorized.push(book)
          }

        }


        return (
        
        <div className="list-books">
              <div className="list-books-title">
                <h1> Pedram's MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                    <Bookshelf title="Currently Reading" books={booksCurrentlyReading} handler={this.props.handler}/>
                    <Bookshelf title="Want to Read" books={booksWantToRead} handler={this.props.handler}/>
                    <Bookshelf title="Read" books={booksRead} handler={this.props.handler}/>
                    {/* There is an API limitation to the getall method that does not include books removed/not on a shelf. 
                    Therefore the "not on a bookshelf' shelf will not get populated."  */}
                    {/* <Bookshelf title="Not on a Bookshelf" books={booksUncategorized} handler={this.props.handler}/> */}
                </div>
              </div>
              <div className="open-search" >
                <Link to="/search" className="open-search"><button>Add a Book</button></Link>
              </div>
        </div>
        
      )
    }
    }

export default Shelves
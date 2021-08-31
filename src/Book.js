import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

// The Book component renders the UI to display each of our books.
// We need to pass as props the book object, as well as the handler function to update the shelf.
// The handler is defined in the root app component and needs to be passed along each child

class Book extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        handler: PropTypes.func.isRequired
    }

    // fetchAuthors = authors => {
    //     return authors != null ? authors : "Anonymous"    
    // }

    getImageLink = imageLinks => (
        imageLinks != null 
        ? imageLinks.thumbnail 
            ? imageLinks.thumbnail
            : imageLinks.smallThumbnail ?  imageLinks.smallThumbnail : ""
        : ""    
    )

    render() {
  
      const {title, authors, imageLinks, shelf} = this.props.data

      const image = this.getImageLink(imageLinks)

      // search results do not have a shelf value, so we need to set a value of 'none'
      const fixedShelf = shelf ? shelf : 'none'
      console.log(title, 'shelf - ', fixedShelf)

  
  
      return (
        <li key={this.props.key} className="book">
          <div className="book">
            <div className="book-top">
              <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${image})`
              }}>
              
              </div>
              <ShelfChanger shelf={fixedShelf} handler={this.props.handler} book={this.props.data}/>
              {/* <div className="book-shelf-changer">
                <select value={shelf || 'none'} onChange={(e) => this.props.handler(this.props.data, e.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div> */}
            </div>
            <div className="book-title">{title}</div>
            
            {/* Not all books have authors, so we need to handle that edge case. */}
            {authors ? authors.map((author) => (<div className="book-authors" key={author}>{author}</div>)) : <div className="book-authors" >Anonymous</div> }
            <div className="shelf">Shelf: {fixedShelf}</div>
          </div>
        </li>
        
      )
    }
  }
  

export default Book
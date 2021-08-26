import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'

class ShelfChanger extends React.Component {
    
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired
    }

    render() {
        const { shelf, handler} = this.props
        return (
            <div className="book-shelf-changer">
                <select value={shelf || 'none'} onChange={(e) => handler(this.props.book, e.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default ShelfChanger



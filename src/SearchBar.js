import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// This is a user input component to update the search query.

class SearchBar extends React.Component {
    static propTypes = {
        query: PropTypes.string.isRequired,
        updateQuery: PropTypes.func.isRequired
    }

    render () {

        const { query, updateQuery} = this.props


        return (
            <div className="search-bar">
                <div className="search-books-bar">
                    <Link to='/' ><button className="close-search" >Close</button></Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
        
                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            className="search-books-input"
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => {
                                event.preventDefault()
                                updateQuery(event.target.value)
                            }}
                        />
                    
                    </div>
    
                </div> 

              
               
              
            </div>


        )
    }
}

export default SearchBar


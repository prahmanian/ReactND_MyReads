import React from 'react'
import Book from './Book'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import SearchBar from './SearchBar'
import SearchTerms from './SearchTerms'
import _ from 'lodash'
import PropTypes from 'prop-types'


class Search extends React.Component {
    state = {
        query: "",
        results: [],
        error: '',
        books: []
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        handler: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.debouncedUpdateQuery = _.debounce(this.updateQuery, 300);
        this.debouncedGetResults = _.debounce(this.getResults, 300);

    }

    // componentDidMount() {
    //     const bookshelvesBooks = this.props.books
    //     console.log("search - mount", bookshelvesBooks)
    //     this.setState({books: bookshelvesBooks})
        
    // }

    componentDidUpdate() {
        const bookshelvesBooks = this.props.books
        console.log("search- update", bookshelvesBooks)
        if (bookshelvesBooks!== this.state.books){
            this.setState({books: bookshelvesBooks})
        }
        
        
    }


    updateQuery = (query) => {
        const q = query.slice(-2) === '  ' ? query.trim() + " " : query
        this.setState(() => ({
            query: q,
        }))
        this.debouncedGetResults()
        // this.setState({results: this.getResults()})
    }

    getResults = () => {
        if (this.state.query && this.state.query !== '') {
            BooksAPI.search(this.state.query.trim())
            .then( (res) => {
                console.log(this.state.query, res)
                // this.setState({results: res})
                if (typeof(res) === 'undefined' || res.error){
                    this.setState({results: []})
                    return []
                }
                this.setState({results: res})
                return res
            })
        } else if (this.state.query === '') {
            this.setState({results: []})
            return []
        }

    }

    render () {

        const { query, results} = this.state




        return (      
            
            

                <div className="search-books">
                    <SearchBar query={this.state.query} updateQuery={this.updateQuery} />


                    { query === '' ? <SearchTerms /> :

                        <div className="search-books-results">
                            <h2 className="bookshelf-title">{`Search Results for: ${query}`}</h2>
                            <ol className="books-grid">


                                {Array.isArray(results) && results.length > 0 && query !== ''
                                    ? results.map( (book) => (<Book key={book.id} data={book} handler={this.props.handler}/>))
                                    : <div>{`Ooops... something went wrong and we couldn't find any results for ${query}.
                                    Try searching for one of the provided search terms.`}</div>
                                    
                                }
                            </ol>
                            <Bookshelf title="All Books on your Bookshelves" books={this.state.books} handler={this.props.handler}/>
                        </div>
                        
                    }


                    {/* {results.length>0 ? <Bookshelf title="All Books on your Bookshelves" books={this.state.books} handler={this.props.handler}/> : <br></br> } */}
                
                </div>
        


        )
    }
}

export default Search


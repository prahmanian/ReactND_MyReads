import React from 'react'

// The SearchTerms component displays a list of white listed search terms, alphabetically.

class SearchTerms extends React.Component {

    render () {



        const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 
            'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 
            'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 
            'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 
            'Cycling', 'Desai', 'Design', 'Development', 
            'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 
            'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 
            'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 
            'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 
            'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 
            'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 
            'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 
            'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 
            'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 
            'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

        let searchKeys = new Set()

        searchTerms.map((term) => searchKeys.add(term[0].toUpperCase()))

        searchKeys = Array.from(searchKeys)
        searchKeys.sort()



        return (

            <div className="search-terms">
                    <h2 className="search-terms-title">Try using one of the available serch terms below.</h2>
                    <ol className="term-headers">
                        {searchKeys.map( (letter) => (
                            <div key={letter}>
                                <h2 className="term-header">{letter}</h2>
                                <ol className="terms-grid">
                                {searchTerms.filter( term => term[0].toUpperCase() === letter).map((term) => (<li key={term}>{term}</li>))}
                                </ol>
                            </div>
                            
                        ))}
                    </ol>
                    
                    
                    
            </div>
        )
    }
}



export default SearchTerms
# MyReads Project

This is the first project within the React Nanodegree program. The objective of this project is to develop a functioning React webapp representing a personal library. There are two views, one which represents our bookshelves with the books we are currently reading, have read, or want to read. The second view provides a search function to browse books from the library and possibly add them to our bookshelves. In the student starter code, we were given a static HTML and CSS representation of the project, the task at hand was to develop the app using React.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start` 

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── STARTERINFO.md # The original README.md file from the starter code.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the app. Feel free to customize this as you desire.
    ├── App.js # This is the root of the app.
    ├── StarterBooksApp.js # The original static HTML representation of the app, placed into a component for reference.
    ├── ShelfChanger.js # Component to change bookshelf values.
    ├── Book.js # Component to render a single book.
    ├── Bookshelf.js # Component to render an array of books.
    ├── Shelves.js # Component to render our bookshelfs representing Read, Currently Reading, and Want to Read books. Parent of root route.
    ├── Search.js # Parent of Search route.
    ├── SearchBar.js # Component to take user input for search queries.
    ├── SearchTerms.js # Displays white listed search terms.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend,

## App Structure

### { App }

This is the root component encompassing our app. When this component mounts, it makes an API request to get all the books currently on a shelf, then sets the 'books' element of the state to the returned array of objects representing each book.

State = {
    books: []
}

There are two methods defined here that will be passed along to child components as need be.

```js
fetchBooks()
```

Sends a new request to the backend server for all books currently on a shelf and updates the state.

```js
handleUpdate(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Updates the shelf of a Book and sets the new state as well as persist the change to the database by calling the API's update method.

Routes

[`/`] The root route displays our three bookshelves with book components on the appropriate shelf.
[`/search`] The /search route displays the interactive search component with a search bar that dynamically searches for books that can be added to a shelf.

#### Route [`/`] Component { Shelves }

The Shelves component is the parent component of the root "/" route of our app.
This component renders a header and navigation buttons along with a Bookshelf component for each classification of books: 
- Currently Reading
- Want to Read, 
- Read

This component is stateless. However it does require two props:
* books: `<Array>` containing individual Book objects of each book currently on one of our shelves.
* handler: `<Function>` callback function for updating a books shelf. This function is passed down as props through each child component to get to the Book component.

In the render method, a single for loop is used to performantly categorize the books by what shelf they are on. Each shelf has an array of filtered books. We then invoke the Bookshelf component for each shelf.

##### Component { Bookshelf }

The Bookshelf component maps over a given array of books and renders a Book component for each book.
This component can be used to render any array of books, wether that be books on a particular shelf or search results.

This component is stateless. However it does require three props:
* books: `<Array>` containing individual Book objects of each book on the given bookshelf.
* title: `<String>` the name of the bookshelf.
* handler: `<Function>` callback function for updating a books shelf. This function is passed down as props through each child component to get to the Book component.

###### Component { Book }

The Book component renders the UI to display each of our books.
We need to pass as props the book object, as well as the handler function to update the shelf.
The handler is defined in the root app component and needs to be passed along each child [`App >  Shelves > Bookshelf > Book`]

This component is stateless. However it does require two props:
* data: `<Object>` the object representing the book.
* handler: `<Function>` callback function for updating a books shelf. This function is passed down as props through each child component to get to the Book component.

There are helper methods defined here that handle discrepencies and formatting of key properties on the book object.

```js
getImageLink (imageLinks)
```

* imageLinks: `<Object>` containing a 'thumbnail' and 'smallThumbnail' keys with string URL links as values.
* Handles logic to return a singular string URL for the Book cover image.

The Book component has a select input field to change the shelf the given book is on.


####### Component { ShelfChanger }

This component is used to modify the shelf value of the book components.


#### Route [`/Search`] Component { Search }

This is the parent component of the /search route. This component always renders the SearchBar component to take user input. When the search query is empty, this component invokes the SearchTerms component to guide the user in utilizing a whitelisted search term. When a valid search query is inputed, the results are rendered as Book components. A summary of books currently on a shelf is rendered through a Bookshelf component.

State = {
    query: "",
    results: [],
    error: ''
}

There are two methods defined here that will be passed along to child components as need be.

```js
updateQuery(query)
```

This method handles some logic on handling input. It calls setState as well as a debounced getResults call.

```js
getResults()
``` 
* Handles edge case logic, fetches serch results from the database and updates our state.

This component requires two props:
* books: `<Array>` containing all books currently on any shelf.
* handler: `<Function>` callback function for updating a books shelf. This function is passed down as props through each child component to get to the Book component.

##### Component { SearchBar }

The SearchBar component provides an interactive search bar to update the search query.

This component is stateless. However it does require two props:
* query: `<String>` the user inout search term.
* updateQuery: `<Function>` callback function for updating the search query in the parent Search component.


##### Component { SearchTerms }

The SearchTerms component is stateless and does not take in props. This is not meant to be an interactive component but rather an informative one. We hardcoded the searchTerms variable with an array of the given whitelisted terms. This component renders these terms alphabethically, and with labels, to the user when there is no search query.

##### Component { Book }

We are reusing the Book component to render our search results.

###### Component { ShelfChanger }

We are reusing the ShelfChanger component to add books to our shelves. The default value from search results is set to 'none'.


##### Component { Bookshelf }

We reuse our Bookshelf component to render a summary view of all books currently on a shelf.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

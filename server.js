'use strict';

// Load environment
require('dotenv').config();

// APP Dependencies
const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');
const pg = require('pg');

// APP Setup
const app = express();
const PORT = process.env.PORT;

//Database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// APP middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// set the view engine for serverside templating
app.set('view engine', 'ejs');

// API routes -- render the search form
app.get('/new', newSearch);
app.get('/', getBooks);

// app.get('/searches/:save_id', saveOneBook);

app.get('/details/:detail_id', viewDetails);

// locahost:3000/books/1
app.get('/books/:book_id', getOneBook);

// Creates a new search to the Google Books API
app.post('/searches', createSearch);

// catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));



//Helper functions

function Book(info) {
  this.title = info.volumeInfo.title ? info.volumeInfo.title : 'No title available';
  this.authors = info.volumeInfo.authors ? info.volumeInfo.authors : 'No author available';
  this.description = info.volumeInfo.description ? info.volumeInfo.description : 'No description available';
  this.identifier = info.volumeInfo.industryIdentifiers[0].identifier ? `ISBN_13 ${info.volumeInfo.industryIdentifiers[0].identifier}`: 'No ISBN Available';
  this.imageLinks = `http://books.google.com/books/content?id=${info.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

}
function newSearch (request, response){
  response.render('pages/index');
}

// EJS file extension is not required
function getBooks(request, response){
  let SQL = 'SELECT * FROM books;';
  
  return client.query(SQL)
    .then(results => {
      console.log('line 69', 'results.rows',results.rows);
      response.render('pages/searches/show', { results: results.rows })
    })
    .catch(handleError);
}

function getOneBook(request, response) {

  console.log('BOOK ID = ', request.params.book_id);

  let SQL = 'SELECT * FROM books WHERE id=$1;';
  let values = [request.params.book_id];

  return client.query(SQL, values)
    .then(result => {
      console.log('line 78','result.rows[0]', result.rows[0]);
      return response.render('pages/index', { results: result.rows[0] });
    })
    .catch(err => handleError(err, response));
}

// NO API key required
// you should console.log(request.body) AND (request.body.search); all that.
function createSearch(request, response){
  console.log('line92', 'request.body',request.body);
  let url ='https://www.googleapis.com/books/v1/volumes?q=';
  if (request.body.search[1]==='title') {url+= `+intitle:${request.body.search[0]}`;}
  if (request.body.search[1]==='author') {url+= `+inauthor:${request.body.search[0]}`;}
  // console.log(url);
  // response.send('Ok');

  superagent.get(url)

    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult)))
    .then(results => {
      console.log('line103','results[1].identifier',results[1].identifier);
      response.render('pages/searches/new', {searchResults: results})})



    .catch(err => handleError(err,response));

}

function viewDetails(request, response) {
  let isbn = request.params.detail_id;
  let url = `https://www.googleapis.com/books/v1/volumes?q=+isbn${isbn}`;
  superagent.get(url)
    .then(isbnResult => {
      let bookDetail = new Book(isbnResult.body.items[0].volumeInfo);
      response.render('pages/books/detail', { results: [bookDetail] });
    });
}

function handleError(error, response){
  console.log(error);
  console.log('response', response);
  if (response) response.render('pages/error', {error: 'Something went wrong....  Try again!'});
}

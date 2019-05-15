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

// Routes

app.get('/', getBooksFromDB);  //  pages/index
app.get('/new', searchForm);  //   searches/new
app.post('/searches', searchNewBooks);  // searches/show
app.get('/books/:book_id', viewDetails); // books/show
// app.post('/searches/:save_id', saveBookToDB);


// catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


//Helper functions


function getBooksFromDB(request, response){
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then(results => {
      console.log('line 55', 'results.rows', results.rows);
      response.render('pages/index', { results: results.rows })
    })
    .catch(handleError);
}

function searchForm (request, response){
  response.render('pages/searches/new');
}

function viewDetails(request, response) {

  console.log('BOOK ID = ', request.params.book_id);

  let SQL = 'SELECT * FROM books WHERE id=$1;';
  let values = [request.params.book_id];

  return client.query(SQL, values)
    .then(results => {
      console.log('line 70', results);
      return response.render('pages/books/show', { results: results.rows[0] });
    })
    .catch(err => handleError(err, response));
}

function searchNewBooks(request, response){
  console.log('line77', 'request.body',request.body);
  let url ='https://www.googleapis.com/books/v1/volumes?q=';
  if (request.body.search[1]==='title') {url+= `+intitle:${request.body.search[0]}`;}
  if (request.body.search[1]==='author') {url+= `+inauthor:${request.body.search[0]}`;}
  // console.log(url);
  // response.send('Ok');

  superagent.get(url)

    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult)))
    .then(results => {
      console.log('line103','results[1].identifier',results); //[1].identifier
      response.render('pages/searches/show', {searchResults: results})})



    .catch(err => handleError(err,response));

}



//Constructor
function Book(info) {
  this.title = info.volumeInfo.title ? info.volumeInfo.title : 'No title available';
  this.authors = info.volumeInfo.authors ? info.volumeInfo.authors : 'No author available';
  this.description = info.volumeInfo.description ? info.volumeInfo.description : 'No description available';
  this.identifier = info.volumeInfo.industryIdentifiers[0].identifier ? `ISBN_13 ${info.volumeInfo.industryIdentifiers[0].identifier}`: 'No ISBN Available';
  this.imageLinks = `http://books.google.com/books/content?id=${info.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

}

function handleError(error, response){
  console.log(error);
  console.log('response', response);
  if (response) response.render('pages/error', {error: 'Something went wrong....  Try again!'});
}

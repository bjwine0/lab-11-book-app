'use strict';

// Load environment
require('dotenv').config();

// APP Dependencies
const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');

// APP Setup
const app = express();
const PORT = process.env.PORT||3000;

// APP middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// set the view engine for serverside templating
app.set('view engine', 'ejs');

// API routes -- render the search form
app.get('/', newSearch);
// app.get('/', createSearch);

// Creates a new search to the Google Books API
app.post('/searches', createSearch);

// catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

//Helper functions

function Book(info) {
  this.placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.title || 'No title available';
  this.authors = info.authors || 'No author available';
  this.publishedDate = info.publishedDate || 'No date of publication available';
  this.imageLinks = `http://books.google.com/books/content?id=${info.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

}

// EJS file extension is required
function newSearch (request, response){
  response.render('pages/index');
}

// NO API key required
// you should console.log(request.body) AND (request.body.search); all that.
function createSearch(request, response){
  console.log(request.body);
  let url ='https://www.googleapis.com/books/v1/volumes?q=';
  if (request.body.search[1]==='title') {url+= `+intitle:${request.body.search[0]}`;}
  if (request.body.search[1]==='author') {url+= `+inauthor:${request.body.search[0]}`;}

  console.log(url);

  // response.send('Ok');

  superagent.get(url)
    
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    
    .then(results => response.render('pages/searches/show', {searchResults: results}));



  // .catch(err=>handleError(err,response));

}

// function handleError(err, response){
//   console.log(err);
//   if(response)response.status(500).send('Sorry, something went wrong');

// }
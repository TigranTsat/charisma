
// require express
var express = require("express");

//path module
var path = require("path");

// create the express app
var app = express();

// require body-parser
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

// static content
app.use(express.static(path.join(__dirname, './views')));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res){
  res.render("index");
});

app.get('/upload-recording', function(req, res){
  res.render("upload-recording");
});

app.get('/check_status?id=<id>', function(req, res){
  res.render("/check_status?id=<id>");
});

// creating a server using http module:
var analyzers = require('./analyzers.js')

// tell your server which port to run on
app.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");

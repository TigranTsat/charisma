
// require express
var express = require("express");
var db_gate = require("./db_gate");

//path module
var path = require("path");

// create the express app
var app = express();

// require body-parser
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

// static content
app.use(express.static(path.join(__dirname, './public')));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res){
  res.render("index");
});

app.get('/upload-recording', function(req, res){
  res.render("upload-recording");
});

app.get('/check_status', function(req, res){
    var task_id = req.query.task_id;
    console.log("Inside check_status for task_id = " + task_id);
    task_status = db_gate.create_task_id()
  res.render("/check_status?id=<id>");
});


// creating a server using http module:
var analyzers = require('./analyzers.js')

// tell your server which port to run on
app.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");


// require express
var express = require("express");
var db_gate = require("./db_gate")();
var analyzers = require('./analyzers.js')

//path module
var path = require("path");

var app = express();
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
    task_status = db_gate.get_task_id(task_id);
    res.json(task_status);
});

// TODO: demo endpoint, will be replaced by upload audio
app.get('/create_task', function(req, res){
    var task_id = db_gate.generate_rand_id();
    console.log("Inside create_task for task_id = " + task_id);
    task_status = db_gate.create_task_id(task_id);
    res.json(task_status);
});

// Returns audio analysis for file with task_id = xxxxxx
app.get('/get_analysis', function(req, res){
    var task_id = req.query.task_id;
    console.log("Inside get_analysis for task_id = " + task_id);
    // TODO: query db for report
    res.json({todo:"TODO"});
});

app.get('/sentiment', function(req, res){
  res.render("sentiment");
});

app.listen(6789);
console.log("Running in localhost at port 6789");

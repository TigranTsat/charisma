
// require express
var express = require("express");

//path module
var path = require("path");

// create the express app
var app = express();

// require body-parser
var bodyParser = require('body-parser');

var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');

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
  res.render("/check_status?id=<id>");
});


// creating a server using http module:
var analyzers = require('./analyzers.js')

// tell your server which port to run on
app.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");

binaryServer = BinaryServer({port: 9001});

binaryServer.on('connection', function(client) {
  console.log('new connection');

  var fileWriter = new wav.FileWriter(outFile, {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });

  client.on('stream', function(stream, meta) {
    console.log('new stream');
    stream.pipe(fileWriter);

    stream.on('end', function() {
      fileWriter.end();
      console.log('wrote to file ' + outFile);
    });
  });
});


// require express
var express = require("express");
var db_gate = require("./db_gate")();
var analyzers = require('./analyzers.js');
var business_logic = require('./business_logic.js')

var busboy = require('connect-busboy'); //middleware for form/file upload
var fs = require('fs-extra');       //File System - for file manipulation
var path = require("path");

var app = express();
var bodyParser = require('body-parser');
app.use(busboy());
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

app.get('/recording_analysis', function(req, res){
  res.render("recording_analysis");
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
    var report = db_gate.get_analyze_report(task_id);
    res.json(report);
});
app.get('/all_analysis', function(req, res){
    console.log("Inside all_analysis");
    var report = db_gate.get_list_of_all_reports();
    res.json(report);
});
app.route('/upload_file')
    .post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            var file_id = req.query.file_id;
            var title = req.query.title;
            console.log("Uploading: " + filename + " id = " + file_id);
            fstream = fs.createWriteStream(__dirname + '/files/' + file_id);
            file.pipe(fstream);
            console.log("Created pipe")
            fstream.on('close', function () {
                console.log("Upload Finished for " + title);
                task_status = db_gate.create_task_id(file_id);
                // TODO: use date or timestamp instead of filename
                business_logic.start_audio_processing(file_id, title);
                res.json(task_status);
            });
        });
    });

app.listen(6789);
console.log("Running in localhost at port 6789");

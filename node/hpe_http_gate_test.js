var hpe_http_gate = require('./hpe_http_gate.js')
var db_gate = require("./db_gate");
db_gate.test_db();
// TODO: place with real wav file
hpe_http_gate.recognizespeech('simple_audio1.m4a', function() {
})
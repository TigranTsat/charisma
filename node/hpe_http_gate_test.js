var hpe_http_gate = require('./hpe_http_gate.js')
var db_gate = require("./db_gate")();
db_gate.test_db();
var rand_task_id = db_gate.generate_rand_id();
db_gate.create_task_id(rand_task_id);
task = db_gate.get_task_id(rand_task_id);
if (task.status != 'IN_PROGRESS') {
    throw new Exception();
}

// TODO: place with real wav file
var jobID = 0;
hpe_http_gate.recognizespeech('simple_audio1.m4a', function(err, resp, body) {
		console.log(resp.body);
})
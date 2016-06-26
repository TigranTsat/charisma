var hpe_http_gate = require('./hpe_http_gate.js')
var db_gate = require("./db_gate")();
db_gate.test_db();
var rand_task_id = db_gate.generate_rand_id();
db_gate.create_task_id(rand_task_id);
task = db_gate.get_task_id(rand_task_id);
if (task.status != 'IN_PROGRESS') {
    throw {name: "failure 8893"};
}
db_gate.update_task_status(rand_task_id, 'MY_NEW_TASK_STATUS');
task = db_gate.get_task_id(rand_task_id);
if (task.status != 'MY_NEW_TASK_STATUS') {
    throw {name: "failure 8899"};
}

// TODO: place with real wav file
hpe_http_gate.recognizespeech('simple_audio1.m4a', function() {
})
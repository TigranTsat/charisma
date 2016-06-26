var hpe_http_gate = require('./hpe_http_gate.js')
var db_gate = require("./db_gate")();

// Some DB TEST functions
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
analyze_report = {
    report_id: rand_task_id,
    name: "this is test report",
    analyzers: {}
}
db_gate.create_analyze_report(analyze_report);
var get_analyze_report = db_gate.get_analyze_report(rand_task_id);
if (get_analyze_report == undefined) {
    throw { name: "select get_analyze_report is undefined "}
}
list_of_all_reports = db_gate.get_list_of_all_reports();
if (list_of_all_reports == undefined) {
    throw { name: "list_of_all_reports response is undefined "}
}
if (list_of_all_reports.length < 1) {
    throw { name: "list_of_all_reports length should be >= 1"}
}

// TODO: place with real wav file
var jobID = 0;
hpe_http_gate.recognizespeech('simple_audio1.m4a', function(err, resp, body) {
    console.log(body.actions[0].result.document[0].content);
})

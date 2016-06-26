var hpe_http_gate = require('./hpe_http_gate.js')
var db_gate = require("./db_gate")();
var analyzers = require('./analyzers.js');
var data = require('./data.js'); // TODO: this is HACK
module.exports = {
    // file_id and task_id are same
    /*
        1. make requests to HPE
        2. run analyzers
        3. save result to db
        4. update task as completed
    */
  start_audio_processing: function (file_id, name) {
    console.log("Inside start_audio_processing for file_id = " + file_id);
    on_hpe_recognizespeech = function(data) {
        console.log("on_hpe_recognizespeech. received data: ", data);
        analyze_report = {
            report_id: file_id,
            name: name,
            analyzers: {}
        };
        var res;
        res = analyzers.analyze_words(data);
        analyze_report.analyzers["words_analyzer"] = res;
        // TODO: add status with more analyzers

        // At the end
        db_gate.create_analyze_report(analyze_report);
        db_gate.update_task_status(file_id, "COMPLETED");
    }
    file_path = __dirname + '/files/' + file_id;
    hpe_http_gate.recognizespeech(file_path, on_hpe_recognizespeech);
    // TODO: this is HACK!!!
    word_times = data.get_words_time()
    on_hpe_recognizespeech(word_times)
  }
}
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
            total_score: 0,
            analyzers: {}
        };
        var res;
        res = analyzers.analyze_words(data);
        analyze_report.analyzers["words_analyzer"] = res;
        res = analyzers.analyze_clarity(data);
        analyze_report.analyzers["clarity_analyzer"] = res;
        res = analyzers.analyze_word_durations(data);
        analyze_report.analyzers["word_duration_analyzer"] = res;
        res = analyzers.analyze_word_distribution(data);
        analyze_report.analyzers["word_distribution_analyzer"] = res;
        res = analyzers.analyze_full_text(data);
        analyze_report.analyzers["full_text_analyzer"] = res;
        console.log("=========    REPORT FINISHED WITH ID =  " + file_id + " =========");
        // TODO: add status with more analyzers

        // At the end
        db_gate.create_analyze_report(analyze_report);
        db_gate.update_task_status(file_id, "COMPLETED");

    }
    file_path = __dirname + '/files/' + file_id;
    hpe_http_gate.recognizespeech(file_path, on_hpe_recognizespeech);
  }
}

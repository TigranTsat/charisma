var hpe_http_gate = require('./hpe_http_gate.js')
var db_gate = require("./db_gate")();
module.exports = {
    // file_id and task_id are same
    /*
        1. make requests to HPE
        2. run analyzers
        3. save result to db
        4. update task as completed
    */
  start_audio_processing: function (file_id) {
    console.log("Inside start_audio_processing for file_id = " + file_id);
    on_hpe_recognizespeech = function(data) {
        console.log("on_hpe_recognizespeech. received data: ", data);
    }
    file_path = __dirname + '/files/' + file_id;
    hpe_http_gate.recognizespeech(file_path, on_hpe_recognizespeech);
  }
}
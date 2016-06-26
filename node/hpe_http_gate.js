var http = require('http');
var fs = require('fs');
module.exports = {
    recognizespeech: function(local_file_path, callback) {
        // https://dev.havenondemand.com/apis/recognizespeech#request
        try {
            fs.accessSync(local_file_path, fs.F_OK);
        } catch (e) {
            console.error("File " + local_file_path + " does not exist");
            throw e;
        }
        var options = {
          host: 'https://api.havenondemand.com/',
          path: '/1/api/async/recognizespeech/v1'
        };
    }
}
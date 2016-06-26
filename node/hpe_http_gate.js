var http = require('http');
var fs = require('fs');
var havenondemand = require('havenondemand');

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

        
        var client = new havenondemand.HODClient('0b913aab-b2a1-4b84-97ee-6317c28544ec', 'v1');

        client.post(options,callback,local_file_path);
    }
}
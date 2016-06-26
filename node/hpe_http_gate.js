var http = require('http');
var fs = require('fs');

var db_gate = require("./db_gate")();
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

        /*
        var client = new havenondemand.HODClient('0b913aab-b2a1-4b84-97ee-6317c28544ec', 'v1');

        client.post('recognizespeech',{ url: 'https://www.havenondemand.com/sample-content/videos/hpnext.mp4' }, true, function(err, resp, body) {
            console.log(resp);
            var jobID = body.jobID;

            client.getJobStatus(jobID, function(err, resp, body) {
                console.log(resp.body);
            })
        });
        */


        var options = {
          host: 'api.havenondemand.com',
          path: '/1/api/async/recognizespeech/v1?apikey=0b913aab-b2a1-4b84-97ee-6317c28544ec&url=https://www.havenondemand.com/sample-content/videos/hpnext.mp4',
          method: 'POST'
        };

        callback = function(response) {
          var str = '';

          //another chunk of data has been recieved, so append it to `str`
          response.on('data', function (chunk) {
            str += chunk;
          });

          //the whole response has been recieved, so we just print it out here
          response.on('end', function () {
            console.log(str);
          });
        }

        http.request(options, callback).end();
    }
}
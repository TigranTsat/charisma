var http = require('http');
var fs = require('fs');

var db_gate = require("./db_gate")();
var havenondemand = require('havenondemand');

module.exports = {

    recognizespeech: function(local_file_path, callback) {

        getJobResult = function(jobID, callback) {
            // Get result
            var options = {
              host: 'api.havenondemand.com',
              path: '/1/job/result/'+jobID+'?apikey=0b913aab-b2a1-4b84-97ee-6317c28544ec',
              method: 'POST'
            };

            cb = function(response) {
              var str = '';

              //another chunk of data has been recieved, so append it to `str`
              response.on('data', function (chunk) {
                str += chunk;
              });

              //the whole response has been recieved, so we just print it out here
              response.on('end', function () {
                console.log(str);
                callback(JSON.parse(str));
              });
            }

            http.request(options, cb).end();
        };

        // https://dev.havenondemand.com/apis/recognizespeech#request
        try {
            fs.accessSync(local_file_path, fs.F_OK);
        } catch (e) {
            console.error("File " + local_file_path + " does not exist");
            throw e;
        }

        var callback_to_hpe = function(err, resp, body) {
            console.log("Got response from HPE. err = ", err, "resp = ", "*** ", "body = ", body);
            callback(body);
        }

        var client = new havenondemand.HODClient('0b913aab-b2a1-4b84-97ee-6317c28544ec', 'v1');

        client.post('recognizespeech',{ file: local_file_path }, true, function(err, resp, body) {
            console.log(body);
            var jobID = body.data.jobID;

            console.log(jobID);
            function loopUntilDone(jobID) {
                client.getJobStatus(jobID, function(err, resp, body) {
                    console.log(body.status);
                    if (body.status != 'finished' && body.status != 'failed') {
                        loopUntilDone(jobID);
                    }
                });
            }

            loopUntilDone(jobID);

            client.getJobResult(jobID, callback_to_hpe);

            //getJobResult(jobID, callback);
        });
    }
}

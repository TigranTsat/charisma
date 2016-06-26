var fs = require('fs');
module.exports = function() {
    if (global.db == undefined) {
        var tigras_db = new function() {
            this.set_db_file_path = function(file_path) {
                this.db_file_name = file_path;

            }
            this.insert_val = function(namespace, val) {
                var contents = fs.readFileSync(this.db_file_name , 'utf8');
                var json_context = JSON.parse(contents)
                // for (var attrname in val) { json_context[attrname] = val[attrname]; }
                if (!(namespace in json_context)) {
                    json_context[namespace] = [];
                }
                json_context[namespace].push(val);
                var new_context = JSON.stringify(json_context);
                fs.writeFileSync(this.db_file_name , new_context);
                return json_context;
            }
            this.select_values = function(namespace, callback) {
                var contents = fs.readFileSync(this.db_file_name , 'utf8');
                var json_context = JSON.parse(contents)
                rows =json_context[namespace];
                res = [];
                rows.forEach(function(currentValue, index, array){
                    callback_res = callback(currentValue);
                    if (callback_res != undefined) {
                        res.push(callback(currentValue));
                    }
                }) 
                return res;
            }
            this.update_value = function(namespace, callback) {
                var contents = fs.readFileSync(this.db_file_name , 'utf8');
                var json_context = JSON.parse(contents)
                rows = json_context[namespace];
                for (var i = 0; i < rows.length; i++) {
                    callback_res = callback(rows[i]);
                    if (callback_res != undefined) {
                        // value changed
                        rows[i] = callback_res;
                        var new_context = JSON.stringify(json_context);
                        fs.writeFileSync(this.db_file_name , new_context);
                        return callback_res;
                    }
                }
                return [];
            }
        }
        tigras_db.set_db_file_path('./tigras_db.json');
        global.db = tigras_db;
        console.log("Created db");
    } else {
        console.log("global.db was initialized previously");
        this.db = global.db;
    }
    this.test_db = function() {
        console.log("Inside 'test_db'")
        // this.db.set('test[0]', "[1,2,3]").value;
    },
    this.create_task_id = function(task_id) {
        console.log("Inside 'create_task_id' with id = " + task_id);
        new_task = {task: task_id, status: 'IN_PROGRESS'};
        global.db.insert_val("tasks", new_task);
        return new_task;
    },
    this.get_task_id = function(task_id) {
        console.log("Inside 'get_task_id' with id = " + task_id);
        list_of_suited_tasks = global.db.select_values("tasks", function (entry) {
            if (entry.task == task_id) {
                return entry
            }
        });
        if (list_of_suited_tasks.length != 1) {
            mgs = "Failure to find task Length == " + list_of_suited_tasks.length + ". Needed 1";
            console.error(mgs);
            throw {
                name: mgs
            }
        }
        res = list_of_suited_tasks[0];
        if (res == undefined) {
            console.error("Point 554: res is undefined");
        } else {
            // console.log("Point 543: res = ", res);
        }
        return res;
    },
    this.update_task_status = function(task_id, task_status) {
        console.log("Inside 'update_task_status' with id = " + task_id);
        updated_value = global.db.update_value("tasks", function (entry) {
            if (entry.task == task_id) {
                return {task: task_id, status: task_status}
            }
        });
        if (updated_value == undefined) {
            mgs = "Failure to update task.";
            console.error(mgs);
            throw { name: mgs }
        }
        return updated_value;
    },
    this.generate_rand_id = function () {
        rand_val = Math.round(Math.random() * 1000 * 1000 * 1000).toString();
        return rand_val;
    },
    this.create_analyze_report = function(report) {
        console.log("Inside 'create_analyze_report' with id = " + report.report_id);
        global.db.insert_val("reports", report);
        return report;
    },
    this.get_analyze_report = function(report_id) {
        console.log("Inside 'get_analyze_report' with report_id = " + report_id);
        list_of_suited_reports = global.db.select_values("reports", function (entry) {
            if (entry.report_id == report_id) {
                return entry
            }
        });
        if (list_of_suited_reports.length != 1) {
            mgs = "Failure to find report. Length == " + list_of_suited_reports.length + ". Needed 1";
            console.error(mgs);
            throw { name: mgs }
        }
        res = list_of_suited_reports[0];
        if (res == undefined) {
            console.error("Point 0987: res is undefined");
        }
        return res;
    },
    this.get_list_of_all_reports = function() {
        console.log("Inside 'get_list_of_all_reports'");
        list_of_suited_reports = global.db.select_values("reports", function (entry) {
                return entry
        });
        return list_of_suited_reports;
    }
    return this;

    
};
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
            console.err("Point 554: res is undefined");
        }
        return res;
    }
    this.generate_rand_id = function () {
        rand_val = Math.round(Math.random() * 1000 * 1000 * 1000).toString();
        return rand_val;
    }
    return this;

    
};
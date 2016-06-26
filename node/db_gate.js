const db = require('lowdb')('db.json')
db.defaults({ test: [] })
module.exports = {
    test_db: function() {
        console.log("Inside 'test_db'")
        db.set('test[0]', "[1,2,3]").value;
    }
}
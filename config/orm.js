const connection = require("../config/connection.js");


const orm = {
    all: function(tableInput, cb) {
        connection.query("SELECT * FROM burgers;", function(err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        })
    }
}

module.exports = orm;
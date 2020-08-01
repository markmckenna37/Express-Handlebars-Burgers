const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    const arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
}

const orm = {
    all: function(tableInput, cb) {
        let query = "SELECT * FROM " + tableInput + ";";
        connection.query(query, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });
    },
    create: function(table, cols, vals, cb) {
        let query = "INSERT INTO " + table;
        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";
        console.log(query);

        connection.query(query, vals, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    update: (table, objColVals, condition, cb) => {
        let query = "UPDATE " + table;
        query += " SET ";
        query += objToSql(objColVals);
        query += " WHERE ";
        query += condition;
        connection.query(query, (err, result) => {
            if (err) {
            throw err;
        }
            cb(result);
        });
    } 

}

module.exports = orm;
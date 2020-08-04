const connection = require("../config/connection.js");
//Helper function to add the correct amount of question marks in query connections.
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


//Orm templates for query connections to mysql database.
const orm = {
    //Selecting all burgers from database with parameters fed in from burger.js model
    all: function(tableInput, cb) {
        let query = "SELECT * FROM " + tableInput + ";";
        connection.query(query, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });
    },
        //Creating new burgers with parameters fed in from burger.js model
    create: function(table, cols, vals, cb) {
        //Building our query string
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
    //Updating the api with parameters fed in from burger.js model
    update: (table, objColVals, condition, cb) => {
        //Building our query string
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
    },
    //deleting the selected burger from the burgers api with parameters fed in from the burger.js model
    delete: (table, condition, cb) => {
        let query = "DELETE FROM " + table;
        query += " WHERE ";
        query += condition;
        connection.query(query, (err, result) => {
            if (err) throw err;
            cb(result)
        });
    } 

}

//exporting orm functions
module.exports = orm;
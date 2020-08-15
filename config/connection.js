// Setting up my MySQL connection.
const mysql = require("mysql");
require('dotenv').config();

const password = process.env.password;

//if statement to use heroku/local host
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: password,
        database: "burgers_db"
    });
}


//Connection
connection.connect(function(err) {
    if (err) {
        console.error("error connecting to " + err.stack)
    }
    console.log("Connected as id " + connection.threadId);
})

//Exporting

module.exports = connection;
// Setting up my MySQL connection.
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Dmamjm11!",
    database: "burgers_db"
});

//Connection
connection.connect(function(err) {
    if (err) {
        console.error("error connecting to " + err.stack)
    }
    console.log("Connected as id " + connection.threadId);
})

//Exporting

module.exports = connection;
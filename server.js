const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

//Linking for static content from public directory.
app.use(express.static("public"));

//Parse body as JSON format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setting up handlebars 
const expectHandlebars = require("express-handlebars");

app.engine("handlebars", expectHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Importing routes
const routes = require("./controllers/burgersController.js");

app.use(routes)


//Listening for server requests
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost: " + PORT);
});
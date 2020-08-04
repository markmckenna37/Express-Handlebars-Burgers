const express = require("express");
//Requiring express router for crud functions.
const router = express.Router();
//Importing the model to be used to create burger
const burger = require("../models/burger.js");


//Getting all of the burgers from the api using the orm template
router.get("/", (req, res) => {
    burger.all(function(data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject)
        //Rendering handlebars template
        res.render("index", hbsObject);
    });
});

//Posting the burgers data to the html body using the orm template
router.post("/api/burgers", (req, res) => {
    burger.create([
        "name", "devoured"
    ], [
       req.body.name, req.body.devoured 
    ], result => {
        //
        res.json({ id: result.insertId })
    });
});

//Updating burgers api when a new burger is created using the orm template with the selected burger's id number
router.put("/api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;
    burger.update({
        //Feeding in parameters to be used in query connection
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            //returning error status if there is one
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Deleting burger from api, using orm template with the selected burger's id number
router.delete("/api/burgers/:id", (req, res) => {
    let condition = "id= " + req.params.id;
    burger.delete(condition, (result) => {
        console.log(result);
        res.status(200).end();
    });
})

//Exporting the express router functions
module.exports = router;
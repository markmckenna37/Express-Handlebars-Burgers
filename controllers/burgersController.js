const express = require("express");

const router = express.Router();
//Importing the model to be used to create burger
const burger = require("../models/burger.js");

router.get("/", (req, res) => {
    burger.all(function(data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject)
        res.render("index", hbsObject);
    });
});

router.post("api/burgers", (req, res) => {
    burger.create([
        "name", "devoured"
    ], [
       req.body.name, req.body.devoured 
    ], result => {
        res.json({ id: result.insertId })
    });
});

// router.put("/api/burgers/:id", (req, res) => {
//     let condition = "id = " + req.params.id;
//     burger.update({
//         devoured:
//     })
// })
module.exports = router;
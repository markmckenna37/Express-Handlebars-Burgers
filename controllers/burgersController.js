const express = require("express");

const router = express.Router();
//Importing the model to be used to create burger
const burger = require("../models/burger.js");
const orm = require("../config/orm.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject)
        res.render("index", hbsObject);
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Data = require('.././dataModels/data'); //bring in schema (how data is orgnaized in database)


var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

/* GET home page. */
router.get('/mrjones', function (req, res, next) {
        res.render('classroom', {
            title: "Mr. Jones' Classroom Data"
        })
    });

router.get('/makerspace', function (req, res, next) {
       	res.render('classroom', {
       		title: "Maker Space's Data"
       	})

	});




module.exports = router; //routes resoiblie from model to views

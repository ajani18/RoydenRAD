var express = require('express');
var router = express.Router();
//var Data = require('./dataModels/data'); //bring in schema (how data is orgnaized in database)

/* GET home page. */
router.get('/', function(req, res, next) {
  // var data = [];
  // Data.find()
  // .exec(function (err, docs) {
  //   if(err) return console.error(err);
  //   else {
  //       data = docs;
  //       res.render('index', { title: 'RAD Energy', data: data})
  //   }
  // });
   res.render('index', { title: 'RAD Energy'}); //Goes to 
});

module.exports = router; //routes resoiblie from model to views

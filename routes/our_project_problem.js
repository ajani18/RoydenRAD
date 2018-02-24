var express = require('express');
var router = express.Router();

//This is the problems page.
router.get('/', function(req, res, next) {
    res.render('our_project_problem', { title:'The Problem and Its Setting'});
});

module.exports = router;

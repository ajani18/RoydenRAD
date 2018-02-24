var express = require('express');
var router = express.Router();

//This is the main page.
router.get('/', function(req, res, next) {
    res.render('our_project_home', {title:'Our Project'});
});

module.exports = router;

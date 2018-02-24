var express = require('express');
var router = express.Router();

//This is the findings page.
router.get('/', function(req, res, next) {
    res.render('our_project_bibliography', { title: 'Bibliography'});
});

module.exports = router;

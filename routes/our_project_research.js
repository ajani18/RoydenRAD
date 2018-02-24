var express = require('express');
var router = express.Router();

//This is the research page.
router.get('/', function(req, res, next) {
    res.render('our_project_research', { title: 'Research Methodology'});
});

module.exports = router;

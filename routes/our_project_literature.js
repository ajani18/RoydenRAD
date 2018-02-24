var express = require('express');
var router = express.Router();

//This is the literature page.
router.get('/', function(req, res, next) {
    res.render('our_project_literature', {title:'Background of Related Literature'});
});

module.exports = router;

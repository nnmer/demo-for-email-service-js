'use strict';

let express = require('express');
let router  = express.Router();

router.get('/', function(req, res, next) {
    res.render('layout.hbs');
});

module.exports = router;
var express = require('express');
var router = express.Router();
var conn = require('../lib/db');


router.get('/', function(req, res, next) {
  var progSQL = 'SELECT * FROM dolphin.programmes'
  conn.query(progSQL , (err,rows) => {
    if (err) console.log(err);

    var locals = {
      title: 'Dolphin Cove - Programmes Page',
      data: rows, 
      stylesheet: '/stylesheets/programmes.css',
      bootstrap : false
    }

    res.render('programmes/programmes', locals);

  })
  
});

module.exports = router;

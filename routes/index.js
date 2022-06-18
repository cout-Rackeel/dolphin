var express = require('express');
var router = express.Router();
var conn = require('../lib/db');


router.get('/', function(req, res, next) {
  var progSQL = 'SELECT * FROM dolphin.programmes'
  
  conn.query(progSQL , (err,rows) => {
    if (err) console.log(err);

    var locals = {
      title: 'Dolphin Cove - Home Page',
      data: rows, 
      stylesheet: '',
      bootstrap : false,
      user_session : req.session
    }

    res.render('index', locals);

  })
  
});

module.exports = router;

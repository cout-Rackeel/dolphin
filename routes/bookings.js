var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var locals = {
    title: 'Dolphin Cove - Bookings Page',
    stylesheet: '',
    bootstrap : false
  }
  res.render('bookings/bookings-form' , locals);
});

module.exports = router;

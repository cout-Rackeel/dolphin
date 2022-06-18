var express = require('express');
const conn = require('../lib/db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var bookingSQL ="SELECT bk.voucher_num , cl.f_name , cl.l_name, vc.num_of_participants, pg.prog_nm AS programme_name,tc.tour_nm AS tour_Company , bk.booked_dt, bk.excursion_dt, bk.cost * vc.num_of_participants AS Group_cost, rs.residence FROM dolphin.bookings bk , dolphin.vouchers vc , dolphin.residences rs , dolphin.residences rt, dolphin.clients cl , dolphin.tour_companies tc , dolphin.programmes pg WHERE bk.voucher_num = vc.voucher_num AND vc.client_id = cl.id  AND vc.tour_comp_id = tc.id AND bk.programme_id = pg.id AND vc.residence_id = rs.id AND rs.type_id = rt.id;"

  conn.query(bookingSQL , (err,rows) => {
    if(err) throw err
    var locals = {
      title: 'Dolphin Cove - Bookings Page',
      stylesheet: '',
      data : rows,
      bootstrap : false,
      user_session : req.session
    }

    res.render('bookings/bookings' , locals);
  
  })
   
});



router.get('/client-form', function(req, res, next) {
  var locals = {
    title: 'Dolphin Cove - Client Form',
    stylesheet: '',
    bootstrap : false
  }
  res.render('bookings/bookings-client-form' , locals);
});


router.get('/voucher-form', function(req, res, next) {
  var locals = {
    title: 'Dolphin Cove - Client Form',
    stylesheet: '',
    bootstrap : false,
    client_session: req.session.client.f_name
  }
  res.render('bookings/bookings-voucher-form' , locals);
});




router.post('/add-client', function(req,res,next){
  req.session.client = {f_name : req.body.f_name}
  res.redirect('/bookings/voucher-form')
})


module.exports = router;

var express = require('express');
var router = express.Router();
var conn = require('../lib/db');
var bcrypt = require('bcrypt')


// var getCompanies = (callback) => {
//   var emails = []
//   conn.query('Select tc.tour_nm FROM dolphin.tour_companies tc;' , (err,rows) =>{
//     rows.forEach(row => {
//       return email.push(row + '@gmail.com')
//     })
//   })
// }


// function checkUser(email){
//   var emails = ['Jamstar@gmail.com']
//   var userType = 'guest';
//   emails.forEach(emailComp =>{
//     if( email == emailComp){

//     }
//   })
// }


router.get('/', function(req, res, next) {
 

    var locals = {
      title: 'Dolphin Cove - Login Page',
      stylesheet: '',
      bootstrap : false,
      user_session : req.session
    }

    res.render('login/login-form', locals);

  
});

router.get('/signup', function(req, res, next) {
 

  var locals = {
    title: 'Dolphin Cove - Login Page',
    stylesheet: '',
    bootstrap : false
  }

  res.render('login/signup-form', locals);


});

router.post('/add' , (req,res,next) => {
  var saltRounds = 10;
  var adduserSQL = 'INSERT INTO users SET ?'
  bcrypt.hash(req.body.password , saltRounds , (err, hash) => {
    data = { email:req.body.email , password:hash , userType : 'user'}
    conn.query(adduserSQL, data , (err, rows) => {
      if(err) throw err;

      req.flash('success','Successfully added Account')
      res.redirect('/')
    })
  })
})

router.post('/login' , (req, res , next) => {
  var authSQL = 'Select * FROM users WHERE email = ?';
  var data = [req.body.email];

  conn.query(authSQL, data , (err , rows) => {

    if(rows.length <= 0){
      req.flash('error', 'Invalid credentials');
      res.redirect('/login');
    }else{

      bcrypt.compare(req.body.password, rows[0].password, (err,result) => {
        if(!result){
          req.flash('error' , 'Incorrect password');
          req.session.keeper = req.body.email;
          res.redirect('/login')
        }else{
          req.flash('success' , 'Successfully Logged in');
          req.session.keeper = '';
          req.session.user = {loggedIn: true , email:req.body.email , password:req.body.password, userType : rows[0].userType}
          res.redirect('/')
        }
       })
    } 

  })


})

router.get('/logout' , (req, res , next) =>{
  req.session.destroy();
  res.redirect('/')
})
module.exports = router;

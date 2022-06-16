var mysql = require('mysql');

const conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database: "dolphin"
})

conn.connect((err) => {
  if(!err){
    console.log('Connected to the Database..... Thank you Jesus');
  }else{
    console.log('Not Connected to the Database..... Thank Him anyhow');
  }
})

module.exports = conn;
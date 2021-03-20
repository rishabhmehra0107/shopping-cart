const express = require('express');
const app = express();
const session_express = require('express-session');
var cors = require('cors')

const PORT = process.env.PORT || 9999;

app.use(cors())
app.use(express.json()); //Data to be in json format
app.use(express.urlencoded({extended:true}));

//Setting the static file
app.use(express.static('uploads'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/Css'));
app.use(express.static(__dirname + '/public/JS'));

app.use(session_express({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  name : 'session1'
}))

app.use('/',express.static(__dirname + '/public/html'));

//Login path
app.use('/login',require('./Router/login_customer.js'));

//Login onwer
app.use('/login_owner',require('./Router/login_owner.js'));

// Product route
app.use('/products',require('./Router/products.js'));

// Cart route
app.use('/cart',require('./Router/cart.js'));

app.use('/transactions',require('./Router/transaction.js'));

app.get('/cust_logout',(req,res) => {
  if(req.session.cust_id!=undefined){
    req.session.cust_id = undefined;
    res.send("Success");
  }
  else{
    res.send("Already logout");
  }
})

app.get('/owner_logout',(req,res) => {
  if(req.session.owner_id!=undefined){
    req.session.owner_id = undefined;
    res.send("Success");
  }
  else{
    res.send("Already logout");
  }
})

app.listen(PORT,() => {
  console.log("Server started");
})

exports = module.exports = app;

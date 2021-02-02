const express = require('express');
const app = express();
const session_express = require('express-session');

const PORT = process.env.PORT || 9999;

app.use(express.json()); //Data to be in json format
app.use(express.urlencoded({extended:true}));

//Setting the static file
app.use(express.static('uploads'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/Css'));

app.use(session_express({
  secret: 'keyboard cat',
  resave: false,
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

app.listen(PORT,() => {
  console.log("Server started");
})

exports = module.exports = app;

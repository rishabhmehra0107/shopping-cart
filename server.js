const express = require('express');
const app = express();
const session_express = require('express-session');

const PORT = process.env.PORT || 9999;

app.use(express.json()); //Data to be in json format
app.use(express.urlencoded({extended:true}));

//Setting the static file
app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(session_express({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  name : 'session1'
}))

app.get('/',(req,res) => {
  res.send("Working");
})

//Login path
app.use('/login',require('./Router/login_customer.js'));

//Login onwer
app.use('/login_owner',require('./Router/login_owner.js'));

// Product route
app.use('/products',require('./Router/products.js'));

app.listen(PORT,() => {
  console.log("Server started");
})

exports = module.exports = app;

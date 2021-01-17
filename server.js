const express = require('express');
const app = express();

const PORT = process.env.PORT || 9999;

app.use(express.json()); //Data to be in json format
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
  res.send("Working");
})

//Login path
app.use('/login',require('./Router/login_customer.js'));

//Login onwer
app.use('/login_owner',require('./Router/login_owner.js'));

app.listen(PORT,() => {
  console.log("Server started");
})

exports = module.exports = app;

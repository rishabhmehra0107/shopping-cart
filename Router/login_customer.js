//Router object
var express = require('express');
var route = express.Router();

//DB objects
const {db , Customer} = require('../DB/db.js');

//Login route customer
route.post('/',async (req , res) => {
  // console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;

  //Check for the initial cred
  if(email.length<=7 || password.length<=7){
    res.status(400).send("Either email or password is incorrect");
  }

  // Encrypt the password  // (Function to be added here)

  //Get the encrypted password from database
  const customer = await Customer.findOne({ where: { customer_email : email } });
  if(customer == null){
    res.status(400).send("Either email or password is incorrect");
  }

  //Check for the password
  if(customer.dataValues.customer_password != password){
    res.status(400).send("Either email or password is incorrect");
  }
  else{
    req.session.loginTrue = true;
    res.status(200).send("Success");
  }

})

//Signup route customer
route.post('/signup',async (req,res) => {
  // console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var address = req.body.address;
  var phone = req.body.phone;

  if(name.length <= 5 || email.length<=7 || password.length<=7 || address.length<=15 || phone.length!=10){
    res.status(400).send("Please follow the instruction inorder to create account with us");
  }

  const customer_val_ema = await Customer.findOne({ where: { customer_email : email} });
  const customer_val_adr = await Customer.findOne({ where: { customer_address : address} });

  if(customer_val_ema != null || customer_val_adr!=null){
    res.status(400).send("Sorry,we think you already had an account with us");
  }
  else{
    // Encrypt the password  // (Function to be added here)

    await Customer.create({
      customer_name : name ,
      customer_email : email,
      customer_address : address,
      customer_password : password,
      customer_phone : phone
    });

    res.status(200).send("Success");
  }

})

module.exports = route;

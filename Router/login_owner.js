//Router object
var express = require('express');
var route = express.Router();
var validator = require('aadhaar-validator');

//DB objects
const {db , Owner , Store} = require('../DB/db.js');

//Login route Owner
route.post('/',async (req , res) => {
  var email = req.body.email;
  var password = req.body.password;

  //Check for the initial cred
  if(email.length<=7 || password.length<=7){
    res.status(400).send("Either email or password is incorrect");
  }

  // Encrypt the password  // (Function to be added here)

  //Get the encrypted password from database
  const owner = await Owner.findOne({ where: { owner_email : email } });
  if(owner == null){
    res.status(400).send("Either email or password is incorrect");
  }

  //Check for the password
  if(owner.dataValues.owner_password != password){
    res.status(400).send("Either email or password is incorrect");
  }
  else{
    req.session.loginTrue = true;
    res.status(200).send("Success");
  }
})

//Signup route Owner
route.post('/signup',async (req,res) => {
  var name = req.body.name;
  var phone = req.body.phone;
  var email = req.body.email;
  var address = req.body.address;
  var password = req.body.password;
  var aadhar = req.body.aadhar;
  var city = req.body.city;
  var state = req.body.state;

  if(name.length <= 5 || email.length<=7 || password.length<=7 || address.length<=15 || phone.length!=10 || city.length<=5 || state.length<=5){
    res.status(400).send("Please follow the instruction inorder to create account with us");
  }

  if(validator.isValidNumber(aadhar)==false){
    res.status(400).send("Please add valid aadhar number");
  }

  //Check if owner exist
  const owner_val_ema = await Owner.findOne({ where: { owner_email : email} });
  const owner_val_adr = await Owner.findOne({ where: { owner_address : address} });
  const owner_val_city = await Owner.findOne({ where: { owner_city : city} });

  if(owner_val_ema!=null || owner_val_adr!=null || owner_val_city!=null){
    res.status(400).send("Seems like you already had an account with us or there is already a wonder store in your city");
  }
  else{
    // Encrypt the password  // (Function to be added here)

    const owner_new = await Owner.create({
      owner_name : name,
      owner_address : address,
      owner_phone : phone,
      owner_email : email,
      owner_adhar : aadhar,
      owner_password : password,
      owner_city : city,
      owner_state : state
    });

    //Create the new store
    const store = await Store.create({
      ownerOwnerId : owner_new.dataValues.owner_id,
      store_address : address,
      store_name : 'Wonder Market'
    })

    res.status(200).send("Success");
  }
})

module.exports = route;

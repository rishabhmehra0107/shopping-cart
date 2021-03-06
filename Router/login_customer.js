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
    res.send("Either email or password is incorrect");
  }
  else{
    // Encrypt the password  // (Function to be added here)

    //Get the encrypted password from database
    const customer = await Customer.findOne({ where: { customer_email : email } });
    if(customer == null){
      res.send("Either email or password is incorrect");
      return;
    }
    else if(customer.dataValues.customer_password != password){
      res.send("Either email or password is incorrect");
    }
    else{
      // console.log(customer.dataValues.customer_id);
      req.session.owner_cust = 'customer';
      req.session.cust_id = customer.dataValues.customer_id;
      res.send(`${customer.dataValues.customer_id}`);
    }
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

  console.log(name,email,password,address,phone);
  if(name.length <= 5 || email.length<=7 || password.length<=7 || address.length<=15 || phone.length!=10){
    res.send("Please follow the instruction inorder to create account with us");
  }
  else{

    const customer_val_ema = await Customer.findOne({ where: { customer_email : email} });
    const customer_val_adr = await Customer.findOne({ where: { customer_address : address} });

    if(customer_val_ema != null || customer_val_adr!=null){
      res.send("Sorry,we think you already had an account with us");
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

      res.send("Success");
    }
  }

})

route.get('/cust_isLoggedIn',(req,res) => {
  console.log(req.session.cust_id);
  res.send(`${req.session.cust_id}`);
})

route.get('/logout',(req,res) => {
  req.session.cust_id = undefined;
  res.send("Success");
})

route.get('/get_cust_details',async (req,res) => {
  if(req.session.cust_id==undefined){
    res.send("Login required");
  }
  else{
    var id = req.session.cust_id;
    await Customer.findOne({where : {customer_id : id}}).then((response) => {res.send(response)}).catch((err) => res.send(id + "Error occured"));
  }
})

module.exports = route;
//Router object
var express = require('express');
var route = express.Router();

//DB objects
const {db , Transaction} = require('../DB/db.js');

route.get('/orders_prev',async (req,res) => {
    if(req.session.cust_id==undefined){
      res.send("Login required");
    }else{
      var id = req.session.cust_id;
      await Transaction.findAll({where : {customerCustomerId : id}}).then((response) => {res.send(response)}).catch((err) => res.send(id + "Error occured"));
    }
})

module.exports = route;
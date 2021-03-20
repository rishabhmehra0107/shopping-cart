//Router object
var express = require('express');
var route = express.Router();
const { Op } = require("sequelize");

//DB objects
const {db , Cart, Transaction , Product} = require('../DB/db.js');

route.get('/orders_prev',async (req,res) => {
    if(req.session.cust_id==undefined){
      res.send("Login required");
    }else{
      var id = req.session.cust_id;
      await Transaction.findAll({where : {customerCustomerId : id}}).then((response) => {res.send(response)}).catch((err) => res.send(id + "Error occured"));
    }
})

route.get('/place_order',async (req,res) => {
  //Get all items from cart
  await Cart.findAll({attributes : ['productProductId','prod_count'] , where : {customerCustomerId : req.session.cust_id} , include : [Product]}).then((response) => {

    for(let i=0;i<response.length;i++) {
        //Get the product product
        let p = response[i].product.dataValues;
        p.product_count -= response[i].prod_count;

        Transaction.create({
          customerCustomerId : req.session.cust_id,
          number_of_products : response[i].prod_count,
          total_bill : response[i].prod_count * response[i].product.product_price,
          transaction_type : 'online'
        }).then((responseresponse) => {

        Cart.destroy({where: {
          [Op.and] : [{customerCustomerId : req.session.cust_id} , {productProductId : response[i].productProductId}]
        }}).then((responseres) => {
          Product.destroy({where: {product_id : response[i].productProductId}}).then((ressss) => {
            Product.create(p);
          })
        })

      });
    }

    res.send("Success");

  }).catch((err) => res.send("Error occured"));
})

module.exports = route;
const route = require('express').Router();
const multer = require('multer');
const path = require('path');

const {db , Product} = require('../DB/db.js');

route.get('/all_prod',async (req,res) => {
  await Product.findAll({order : ['product_category']}).then((response) => res.send(response)).catch((err) => res.send("error"));
})

route.get('/product_category',(req,res) => {
  Product.aggregate('product_category','DISTINCT',{plain : false}).then((response) => {
    res.send(response);
  }).catch((err) => {
    res.send("Error occurred");
  })
})

route.post('/get_product_category_wise',(req,res) => {
  var categor = req.body.product_category;

  if(categor==undefined){
    res.send("Category value is not correct");
  }
  else{
    Product.findAll({where : {product_category : categor}}).then((products) => {res.send(products)}).catch((err) => {res.send("error")});
  }
})

route.post('/get_product_id_wise',(req,res) => {
  var id = req.body.product_id;

  if(id==undefined){
    res.send("Category value is not correct");
  }
  else{
    Product.findOne({where : {product_id : id}}).then((product) => {res.send(product)}).catch((err) => {res.send("error")});
  }
})

exports = module.exports = route;

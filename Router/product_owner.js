const route = require('express').Router();
const multer = require('multer');
const path = require('path');
const { Op , Sequelize } = require("sequelize");

const {db , Product,Store} = require('../DB/db.js');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage}).single('prod_img');

route.post('/add_product',upload,async (req , res) => {
    var product_description = req.body.product_description;
    var product_name = req.body.product_name;
    var product_count = req.body.product_count;
    var product_category = req.body.product_category;
    var product_price = req.body.product_price;

    if(product_description.length<20 || product_name.length<6 || product_count<=0 || product_price<10 || product_category.length<=3 || req.file==undefined){
      console.log(req.body);
      console.log(req.file);
      res.send("Error while uploading please follow the instructions");
    }
    else{

      //Store the image
      var name_of_img = req.file.filename;

      await Store.findOne({where : {ownerOwnerId : req.session.owner_id}}).then((resp) => {
        Product.create({
            product_description : req.body.product_description,
            product_name : req.body.product_name,
            product_count : req.body.product_count,
            product_category : req.body.product_category,
            product_price : req.body.product_price,
            product_image_url : req.file.filename,
            storeStoreId : resp.store_id
            // Need to add the store id in session
          }).then((respo) => {
            res.status(200).send("Success");
          })
      })
    }
})

route.get('/all_prod_store_wise',async (req,res) => {
  await Store.findOne({where : {ownerOwnerId : req.session.owner_id}}).then((respo) => {
    Product.findAll({where : {storeStoreId : respo.store_id} , order : ['product_category']})
    .then((response) => res.send(response))
    .catch((err) => res.send("error"))
  });
})

route.post('/get_product_category_wise',(req,res) => {
  var categor = req.body.product_category;

  if(categor==undefined){
    res.send("Category value is not correct");
  }
  else{
    Store.findOne({where : {ownerOwnerId : req.session.owner_id}}).then((respo) => {
      Product.findAll({where : {[Op.and] : [{storeStoreId : respo.store_id} , {product_category : categor}]}, order : ['product_category']})
      .then((response) => res.send(response))
      .catch((err) => res.send("error"))
    });
  }
})


route.get('/product_category',(req,res) => {
  Store.findOne({where : {ownerOwnerId : req.session.owner_id}}).then((respo) => {
    Product.findAll({where : {storeStoreId : respo.store_id} , attributes : [Sequelize.fn('DISTINCT', Sequelize.col('product_category')) ,'product_category'],}).then((response) => {
      res.send(response);
    }).catch((err) => {
      res.send("Error occurred");
    });
  });
});



exports = module.exports = route;

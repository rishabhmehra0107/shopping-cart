const route = require('express').Router();
const multer = require('multer');
const path = require('path');

const {db , Product} = require('../DB/db.js');

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
  if(!req.session.loginTrue){
    res.send("Not allowed");
  }
  else{
    var product_description = req.body.product_description;
    var product_name = req.body.product_name;
    var product_count = req.body.product_count;
    var product_category = req.body.product_category;
    var product_price = req.body.product_price;

    if(product_description.length<20 || product_name.length<6 || product_count<=0 || product_price<10 || product_category.length<=3 || req.file==undefined){
      res.status(400).send("Error while uploading please follow the instructions");
    }
    else{

      //Store the image
      var name_of_img = req.file.filename;

      await Product.create({
        product_description : req.body.product_description,
        product_name : req.body.product_name,
        product_count : req.body.product_count,
        product_category : req.body.product_category,
        product_price : req.body.product_price,
        product_image_url : req.file.filename

        // Need to add the store id in session
      });

      res.status(200).send("Success");
    }
  }
})



exports = module.exports = route;

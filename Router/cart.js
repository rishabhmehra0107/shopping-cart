const route = require('express').Router();
const { Op } = require("sequelize");

const {db , Cart  , Product , Sequelize}  = require('../DB/db.js');

//Add values in cart
route.post('/',async (req,res) => {
  if(!req.session.cust_id){
    res.send("Not authorized");
  }
  //Get the customer id from session
  else{
    var cust_id = req.session.cust_id;
    var prod_id = req.body.prod_id;
    var product_count = req.body.prod_count;

    //Authorize the check
    var product = await Product.findOne({where : {product_id : prod_id}});

    if(product.dataValues.product_count < product_count){
      res.send("We don't have such a number of products");
    }

    else{
      //Store in cart
      Cart.create({
        customerCustomerId : cust_id,
        productProductId : prod_id,
        prod_count : product_count
      });

      res.send("Success");
    }
  }
});

//Delete from the cart
route.post('/delete',(req , res) => {
  if(!req.session.cust_id){
    res.send("Not authorized");
  }
  else{
    var cust_id = req.session.cust_id;
    var prod_id = req.body.prod_id;

    Cart.destroy({where: {
      [Op.and] : [{customerCustomerId : cust_id} , {productProductId : prod_id}]
    }});

    res.send("Success");
  }
})

//get items in the cart
route.get('/getItems',async (req,res) => {
  if(!req.session.cust_id){
    res.send("Not authorized");
  }
  else{
    var cust_id = req.session.cust_id;

    await Cart.findAll({where: {customerCustomerId : cust_id} , include: [Product]}).then((response) => {res.send(response)}).catch((err) => {res.send("Could not fetch details")});
  }
})

exports = module.exports = route;

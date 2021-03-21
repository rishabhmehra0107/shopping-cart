const route = require('express').Router();
const { Op } = require("sequelize");

const {db , Cart  , Product , Store , CartOwner , ProductSold}  = require('../DB/db.js');

route.post('/addItem',async (req,res) => {
    if(!req.session.owner_id){
        res.send("Login required");
    }
    else{

        await CartOwner.create({
           ownerOwnerId : req.session.owner_id,
            productProductId : req.body.product,
            prod_count : req.body.prod_count
        }).then((response) => {res.send("Added successfully")}).catch((err) => {res.send("Error occured")});

    }
})

route.get('/buyItems' ,async (req, res) => {
    if(!req.session.owner_id){
        res.send("Login required");
    }
    else{
        await CartOwner.findAll({where : {ownerOwnerId : req.session.owner_id} ,  include : [Product]}).then(async (respo) => {
            for(let i=0;i<respo.length;i++){
                let p = respo[i].product.dataValues;
                p.product_count -= respo[i].prod_count;

                await Store.findOne({where : {ownerOwnerId : req.session.owner_id}}).then((respon) => {
                    ProductSold.create({
                        product_count : respo[i].prod_count,
                        storeStoreId : respon.store_id,
                        productProductId : respo[i].productProductId
                    }).then((response1) => {
                        Product.destroy({where : {product_id : respo[i].productProductId}}).then((response2) => {
                            Product.create(p);
                        })
                    })
                }).then((response3) => {
                    CartOwner.destroy({where: {
                        [Op.and] : [{ownerOwnerId : req.session.owner_id} , {productProductId : respo[i].productProductId}]
                      }})
                })
            }
            res.send("Success");
        }).catch((err) => {
            res.send("Error");
        })
    }
})

route.post('/delete',(req , res) => {
    if(!req.session.owner_id){
      res.send("Not authorized");
    }
    else{
      var owner_id = req.session.owner_id;
      var prod_id = req.body.prod_id;
  
      CartOwner.destroy({where: {
        [Op.and] : [{ownerOwnerId : owner_id} , {productProductId : prod_id}]
      }});
  
      res.send("Success");
    }
  })

route.post('/check_presence',(req , res) => {
    if(!req.session.owner_id){
      res.send("Not authorized");
    }
    else{
      var owner_id = req.session.owner_id;
      var prod_id = req.body.prod_id;
  
      CartOwner.findAll({where: {
        [Op.and] : [{ownerOwnerId : owner_id} , {productProductId : prod_id}]
      }}).then((response) => {res.send(response)}).catch((err) => res.send("error"));
    }
  })


//get items in the cart
route.get('/getItems',async (req,res) => {
  if(!req.session.owner_id){
    res.send("Not authorized");
  }
  else{
    var owner_id = req.session.owner_id;

    await CartOwner.findAll({where: {ownerOwnerId : owner_id} , include: [Product]}).then((response) => {res.send(response)}).catch((err) => {res.send("Could not fetch details")});
  }
})

module = module.exports = route;
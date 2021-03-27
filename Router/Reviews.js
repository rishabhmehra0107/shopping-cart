const route = require('express').Router();
const {db , Review,Customer} = require('../DB/db.js');
const { Op } = require("sequelize");

route.post("/addReview",(req,res) => {
    var prodid = req.body.prodid;
    var custid = req.session.cust_id;
    var reviewDesc = req.body.description;
    var rating = req.body.rating;

    if(prodid==undefined || custid==undefined || reviewDesc==undefined || rating==undefined || rating>5 || rating<0){
        res.send("Enter the details completely");
    }
    else{
        Review.findAll({where : { [Op.and] : [{customerCustomerId : custid}, {productProductId : prodid}]}}).then((response) => {
            if(response.length>0){
                res.send("You have already added a review");
            }
            else{
                Review.create({
                    review_description : reviewDesc,
                    review_rating : rating,
                    customerCustomerId : custid,
                    productProductId : prodid
                }).then((response) => {res.send("Thanks for your review.")}).catch((err) => {res.send("Error")});
            }
        }).catch((err) => {res.send("Server error")});

    }
})

route.post('/getReview',(req, res) => {
    var prodid = req.body.prodid;
    var custid = req.session.cust_id;
   
    if(prodid==undefined || custid==undefined){
        res.send("Enter the details completely");
    }
    else{
        Review.findAll({where : { [Op.and] : [{customerCustomerId : custid}, {productProductId : prodid}]}}).then((response) => {
            res.send(response);
        }).catch((err) => {res.send("Server error")});
    }
});

module.exports = route;
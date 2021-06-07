const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const db = new Sequelize('wondermarket','sa','omsairam@1234',{
  host : 'localhost,1401',
  dialect : 'mysql'
})

//Onwer object
const Owner = db.define('owner',{
  owner_id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  owner_name : DataTypes.STRING(40),
  owner_address : DataTypes.STRING(150),
  owner_phone : DataTypes.STRING(10),
  owner_email : DataTypes.STRING(50),
  owner_adhar : DataTypes.STRING(12),
  owner_password : DataTypes.STRING(150),
  owner_city : DataTypes.STRING(15),
  owner_state : DataTypes.STRING(15)
});

//Store object
const Store = db.define('store',{
  store_id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  store_address : DataTypes.STRING(150),
  store_name : DataTypes.STRING(20)
  //Store also contain the owner_id which is foreign key
});

//Product object
const Product = db.define('product',{
  product_id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  product_name : DataTypes.STRING(50),
  product_price : DataTypes.INTEGER,
  product_description : DataTypes.STRING(1000),
  product_image_url : DataTypes.STRING(200),
  product_count : DataTypes.INTEGER,
  product_category : DataTypes.STRING(50)
  //Product contain the store id
});

//Review object
const Review = db.define('review',{
  review_id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  review_description : DataTypes.STRING(1000),
  review_rating : DataTypes.INTEGER
  //Also contain the product id as foreign key
});

//Customer object
const Customer = db.define('customer',{
  customer_id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  customer_name : DataTypes.STRING(40),
  customer_address : DataTypes.STRING(150),
  customer_phone : DataTypes.STRING(10),
  customer_email : DataTypes.STRING(50),
  customer_password : DataTypes.STRING(150)
});

//Cart table
const Cart = db.define('cart',{
  cart_id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  //Also contain the customer_id and the product_id
  prod_count : DataTypes.INTEGER
});

//Transaction
const Transaction = db.define('transaction',{
  transaction_id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  number_of_products : DataTypes.INTEGER,
  total_bill : DataTypes.INTEGER,
  transaction_type : DataTypes.STRING(10)
  //Also contain the coustmer_id
});

const CartOwner = db.define('CartOwner',{
  cart_owner_id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  prod_count : DataTypes.INTEGER
})

const ProductSold = db.define('product_sold',{
  product_count : DataTypes.INTEGER,
  //Also contain the coustmer_id,product_id,store_id,transaction_id
})

// Relationships

//For one to one
Store.belongsTo(Owner);
Cart.belongsTo(Customer);
ProductSold.belongsTo(Transaction);

//For one to many
Product.belongsTo(Store);
Customer.hasOne(Review);
Review.belongsTo(Product);
Cart.belongsTo(Product);
Transaction.belongsTo(Customer);
ProductSold.belongsTo(Store);
ProductSold.belongsTo(Product);
CartOwner.belongsTo(Owner);
CartOwner.belongsTo(Product);


//Sync
function syncDB(){
  db.sync({alter : true});
}

// syncDB();

exports = module.exports = {
  db ,
  Owner ,
  Store ,
  Product ,
  Transaction ,
  ProductSold ,
  Cart ,
  Review ,
  Customer,
  Sequelize,
  CartOwner
}

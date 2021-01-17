const {db,Owner,Store,Product,Transaction,ProductSold,Cart,Review,Customer} = require('./DB/db.js');
const app = require('./server.js');

const start_server = async () =>{
  await db.sync({alter : true});
  await app;
};

start_server();

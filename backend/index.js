// importing modoules to be used in this file
const express = require('express');
const cors = require('cors');
const app = express();// naming(as 'app') the builtin express packages(which are in form of a function) 

app.use(express.json());
app.use(cors())

//// START SERVER OPRATION ***********************
const port = process.env.PORT || 3010
app.listen(port, (err) => {
    if (!err)
		console.log(" indexjs: 'Express' server is listening on port:",port,"begin at: " + new Date().toLocaleTimeString()  );
    else
        console.log(`ERROR: server FAIL, NOT running on port ${port}:` + err);
});


//// BUILDING THE DATABASE ********************** 
const db = require("./config/db_config.js");
const conction2 =  db.conction2;


//// MIDDLWARES to aprov (whitlist)  pathes and to block unwanted queries
const aprov_path = require("./middlewares/aprov_path");
app.use(aprov_path.app)


//// ROUTS
const entry_routes = require("./routes/entry_routes");
app.use(entry_routes.app)

const admin_routes = require("./routes/admin_routes");
app.use(admin_routes.app)

const buyer_routes = require("./routes/buyer_routes");
app.use(buyer_routes.app)


//HANDLERS (QUERIES) from DB (see queries list below)
const db_queries_entry = require("./handlers/db_queries_entry");
app.use(db_queries_entry.app)

const db_queries_admin = require("./handlers/db_queries_admin");
app.use(db_queries_admin.app)

const db_queries_buyer = require("./handlers/db_queries_buyer");
app.use(db_queries_buyer.app)


/*
////QUERIES CATEGORIES
A. entry queries(signin-login): in file: db_queries_entry
B. admin queries:  in file: db_queries_admin
C. buyer queries:  in file: db_queries_buyer
*/

/*
////QUERIES 

SIGNIN LOGIN QUERIES
	0.1 CHECK IF USER ID IS USED 
	0.2 SIGNIN 
	0.3 LOGIN  
	0.4 update_time_of_user_last_login  

USERS QUERIES
	1.1A Get USER details BY user
	1.1B Get A USER BY user_id(for admin)
	1.2 Get ALL USERS
	1.3* Get A USER BY email - CANCELLED
	1.4 DELETE A user BY user_id
	1.5 INSERT NEW user
	1.6 UPDATE A USER with hushed id( bcrypt)  
	1.7* UPDATE A USER by email - CANCELLED

PRODUCTS TYPES QUERIES
	2.1 Get ALL PRODUCTS TYPES
	2.2* Get A TYPE BY product_type_code - CANCELLED 
	2.3* INSERT NEW PRODUCT-TYPE  - CANCELLED

PRODUCTS QUERIES
	3.1 GET ALL PRODUCTS 
	3.2 GET PRODUCTS BY product_type
	3.3 Get A PRODUCT by product_code
	3.4* Get A PRODUCT by product_name - CANCELLED
	3.5 DELETE A PORDUCT BY: product_code
	3.6 INSERT NEW PRODUCT
	3.7 UPDATE A PRODUCT BY product_code
	3.8*GET ALL PRODUCTS NAMES - CANCELLED

CARTS
	4.2A GET LAST 5 carts of user THAT WERE NOT SUBMITED  
	4.2B GET 5 CARTS of user-THAT WERE SUBMITED  
	4.3* GET ALL CARTS OF USER ORDER BY cart_date  - CANCELLED
	4.4* GET n CARTS OF USER  - CANCELLED
	4.5 INSERT NEW cart and get back cart_no
	4.6 update cart was submited	 
	4.7 DELETE A cart BY cart_no  

CART ITEMS
	5.1* GET A cart_item   - CANCELLED    
	5.2 DELETE A cart_item
	5.3 GET cart_items of a cart
	5.4 INSERT NEW cart_item
	5.5 UPDATE cart_item
	
ORDERS
	6.1* GET n ORDERS   - CANCELLED 
	6.2 GET LAST 5 ORDERS OF USER 
	6.3 INSERT NEW order and get back order_no
	6.4 UPDATE ORDER
	6.6 list dates with 3+ orders.

CITIES AND STREETS
	7.1 GET ALL CITIES  
	7.2 GET ALL STREETS FILTERED BY city_name
	
GENERAL QUERIES - COUNT QUERIES
	8.1 COUNT orders --> general info for storeInfo component
	8.2 list dates with 3+ orders.
		to block more shipments on these dates)
	8.3 COUNT products  --> for storeInfo component

*/


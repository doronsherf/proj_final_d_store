/*
ROUTS
	BUYER(CUSTUMER) ROUTES(this file) 
		cart, cart items, order, shipping and chekout routs
	ENTRY ROUTES 
		signin, login, authenticate + store info -for customer/admin
	ADMIN ROUTES
		admin-products + admin_users

ROUTS -  in this file
	USERS QUERIES
		1.1 Get USER details
	PRODUCTS TYPES QUERIES
		2.1 Get ALL PRODUCTS TYPES
	PRODUCTS QUERIES
		3.1 GET ALL PRODUCTS 
		3.2 GET PRODUCTS BY product_type
		3.3 Get A PRODUCT
	CARTS
		4.2A GET LAST 5 carts of user THAT WERE NOT SUBMITED  
		4.2B GET 5 CARTS of user-THAT WERE SUBMITED
		4.5 INSERT NEW cart and get back cart_no
		4.6 update cart was submited	 
		4.7 DELETE A cart BY cart_no 
	CART ITEMS
		5.2 DELETE A cart_item
		5.3 GET cart_items of a cart
		5.4 INSERT NEW cart_item
		5.5 UPDATE cart_item
	ORDERS
		6.2 GET LAST 5 ORDERS OF USER 
		6.3 INSERT NEW order and get back order_no
		6.4 UPDATE ORDER
		6.6 list dates with 3+ orders.
	CITIES AND STREETS
		7.1 GET ALL CITIES  
		7.2 GET ALL STREETS of city 
*/

const express = require('express');
const app = express();

const buyer_queries = require('../handlers/db_queries_buyer')  

//1.1 Get USER details BY user_id
const user_details = buyer_queries.user_details;
app.get('/api/users/user_details/:user_id', user_details); 

//2.1 Get ALL PRODUCTS TYPES
const get_all_prod_types = buyer_queries.get_all_prod_types
app.get('/api/types', get_all_prod_types);

//3.1 GET ALL PRODUCTS  
const get_all_products = buyer_queries.get_all_products
app.get('/api/products/all', get_all_products ) ;

//3.2 GET PRODUCTS FILTERED BY product_type_code
const products_by_type = buyer_queries.products_by_type
app.get('/api/products/by_type/:product_type_code',products_by_type );

//3.3 Get A PRODUCT by product_code
const get_product = buyer_queries.get_product
app.get('/api/products/get1/:product_code', get_product);


//4.2A GET LAST 5 carts of user_id THAT WERE NOT SUBMITED  
const last5open_carts = buyer_queries.last5open_carts;
app.get('/api/carts/open/last5/by_user/:user_id', last5open_carts);

//4.2B GET 5 CARTS of user_id-THAT WERE SUBMITED ORDER BY cart_date:DESC 
const last5submited_carts = buyer_queries.last5submited_carts;
app.get('/api/carts/submited/last5/by_user/:user_id',last5submited_carts)

//4.5 INSERT NEW cart and get back cart_no 
const new_cart =  buyer_queries.new_cart
app.post('/api/carts/new',new_cart )
		
//4.6 update cart was submited	
const cart_updated = buyer_queries.cart_updated 
app.put('/api/carts/update', cart_updated)

//4.7 DELETE A cart BY cart_no 
const del_cart = buyer_queries.del_cart
app.delete('/api/cart/del/:cart_no',del_cart); 


//5.2 DELETE A cart_item BY: PK(cart_item_no)  
const del_cart_item = buyer_queries.del_cart_item;
app.delete('/api/cart_items/del/:cart_item_no',del_cart_item) 

//5.3 GET cart_items of a cart
const cart_items_of_cart = buyer_queries.cart_items_of_cart;
app.get('/api/cart_items/of_cart/:cart_no', cart_items_of_cart);

//5.4 INSERT NEW cart_item
const new_cart_item = buyer_queries.new_cart_item
app.post('/api/cart_items/new', new_cart_item);

//5.5 UPDATE cart_item
const update_cart_item = buyer_queries.update_cart_item
app.put('/api/cart_items/update/', update_cart_item); 

//6.2 GET LAST 5 ORDERS OF USER ORDER BY order_date:DESC LIMIT 5
const last5orders = buyer_queries.last5orders
app.get('/api/orders/by_user/:user_id', last5orders);

//6.3 INSERT NEW order and get back order_no 
const new_order = buyer_queries.new_order;
app.post('/api/orders/new', new_order);

//6.4 UPDATE ORDER
const update_order = buyer_queries.update_order;
app.put('/api/orders/update/:order_no', update_order);

//	6.6 list dates with 3+ orders.
const many_shipments_dates = buyer_queries.many_shipments_dates
app.get('/api/ship/count_dates', many_shipments_dates);
 
//7.1 GET ALL CITIES ORDER BY city_name:DESC
// cities_arr2  מערך של כל הישובים בארץ. פועל כראוי. מתעדכן ממאגר המידע- לא בשימוש במסגרת תרגיל זה
const get_cities =buyer_queries.get_cities; 
app.get('/api/address/cities', get_cities);

//7.2 GET ALL STREETS FILTERED BY city_name ORDER BY street_name:ASC
const st_of_city = buyer_queries.st_of_city;
app.get('/api/address/st_of_city/:city_name', st_of_city);


 
module.exports = { app }


/*
//3.4 Get A PRODUCT by product_name
app.get('/api/products/get_by_prod_name/:product_name', (req, res) => {
	let sql_query1 = 'SELECT * FROM products WHERE product_name = ?';
	let sql_query2 = [req.params.product_code];
	
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('admn_rut  Product NOT found!')
				res.json(data);
			} else{
				console.log('admn_rut  procuct retrieved :',data)
				res.send(data);
			}
		}
		else 
			console.log("admn_rut  ERROR in GET A PRODUCT: " + err); 
    });
});
*/

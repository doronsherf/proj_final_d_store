/*
ROUTS
	ENTRY ROUTES 
		signin, login, authenticate + store info -for customer/admin
	BUYER (CUSTUMER) ROUTES 
		cart, cart items, order, shipping and chekout routs
	ADMIN ROUTES (this file)
		admin-products + admin_users

		
ROUTS - handeled in this file
	USERS QUERIES
		1.1 Get A USER BY user_id
		1.2 Get ALL USERS
		1.4 DELETE A user BY user_id
		1.5 INSERT NEW user
		1.6 UPDATE A USER with hushed id( bcrypt)  
	PRODUCTS QUERIES
		3.3 Get A PRODUCT by product_code
		3.5 DELETE A PORDUCT BY: product_code
		3.6 INSERT NEW PRODUCT
		3.7 UPDATE A PRODUCT BY product_code
*/

const express = require('express');
const app = express();

const admin_queries = require('../handlers/db_queries_admin')  


//1.1A Get A USER BY user_id
const get_user2admin = admin_queries.get_user2admin
app.get('/api/users/get1_2admin/:user_id', get_user2admin)

//1.2 Get ALL USERS
const get_all_users = admin_queries. get_all_users
app.get('/api/users/all',  get_all_users);


//1.4A DELETE A user BY user_id
const del_user_query = admin_queries.del_user
app.delete('/api/users/del/:user_id', del_user_query); 

//1.5 INSERT NEW user 
const new_user_query = admin_queries.new_user
app.post('/api/users/new',new_user_query); 

//1.6A UPDATE A USER with hushed id( bcrypt)
const update_user_query = admin_queries.update_user 
app.put('/api/users/update_by_id/:user_id', update_user_query) // urlencodedParser ??

//3.3 Get A PRODUCT by product_code
const get_product2admin = admin_queries.get_product2admin;
app.get('/api/products/get1_2admin/:product_code',get_product2admin )


//3.5 DELETE A PORDUCT BY: product_code
const del_product = admin_queries.del_product
app.delete('/api/products/del/:product_code',del_product )


//3.6 INSERT NEW PRODUCT
const new_product_query = admin_queries.new_product// option2
app.post('/api/products/new',new_product_query) 


//3.7 UPDATE A PRODUCT BY product_code
/*Worning: when updating nothing, does NOT notify the front end. It is OK for this app, but not to any app   */ 
const update_product = admin_queries.update_product
app.put('/api/products/update/:product_code', update_product)

module.exports = { app }

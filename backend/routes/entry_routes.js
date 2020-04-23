/*
ROUTS
	ENTRY ROUTES (this file)
		signin, login, authenticate + store info -for customer/admin
	BUYER (CUSTUMER) ROUTES 
		cart, cart items, order, shipping and chekout routs
	ADMIN ROUTES
		admin-products + admin_users


ROUTS in this file
	SIGNIN LOGIN QUERIES
		0.1 CHECK IF USER ID IS USED 
		0.2 SIGNIN 
		0.3 LOGIN  
		0.4 FUNCTION update_time_of_user_last_login 

	USERS QUERIES
		1.1 Get USER details BY user
		1.6 UPDATE A USER with hushed id( bcrypt)   
	GENERAL INFO QUERIES
		8.1 COUNT orders --> general info for storeInfo component
		8.3 COUNT products  --> for storeInfo component
*/

const express = require('express');
const app = express();

const entry_queries = require('../handlers/db_queries_entry')  


//0.1 CHECK IF USER ID IS USED (for signin)
const check_id_isnt_used = entry_queries.check_id_isnt_used;//OK
app.get('/api/signin/check_id_isnt_used/:user_id', check_id_isnt_used);//OK

//0.2 SIGNIN    
const signin_request = entry_queries.signin; 
app.post('/api/signin',signin_request)

//0.3 LOGIN handle users with hashed pwd - sends minimal data(id+JWT+JWT_expire_time)
const login_request = entry_queries.login; 
app.get('/api/login/:user_id/:password',login_request)

//0.4 FUNCTION update_time_of_user_last_login // executed directly inside file:db_entry_queries  by function

// 1.1 Get USER details BY user
const user_details = entry_queries.user_details;
app.get('/api/users/user_details/:user_id', user_details); 

//1.6 UPDATE A USER with hushed id( bcrypt)
const update_user = entry_queries.update_user; 
app.put('/api/update_user/update/:user_id', update_user)

//8.1 COUNT orders --> general info for storeInfo component
const count_orders = entry_queries.count_orders; 
app.get('/api/orders/count',count_orders);

//8.3 COUNT products  --> general info for storeInfo component
const count_products = entry_queries.count_products; 
app.get('/api/products/count', count_products);

	
module.exports = { app }

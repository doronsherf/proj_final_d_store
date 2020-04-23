// whitelist approach  gatekeeper
/*
In this project, this file, execute Express Middleware functions that have access all request objects (req). 
Express is a routing and middlewares web framework. An Express application is a series of middleware function calls.

This project implements the whitelist approach. it block and return 404 error(' URL has been refused')to any request that is not whitelisted, e.g. is not listed in one of the 4 aproved routes lists:
	1. Free Routes: response is deliverd for any body, including not geristered user. 
	2. user_routes: available for registered coustumers.
	3. admin2routs: available for Low-Level admin.
	4. admin1routs: available for Hi-Level admin.

registered users(costumer, admin 1/2) requests are examined for:
	1. having header whith token
	2. the token is isued by this server (valid JWT)
	3. the JWT isn't expired yet
	4. the request is matching the credentials(the approved pathes) of the requester(costumer, admin 1/2)
*/

const express = require('express');

const app = express();// naming(as 'app') the builtin express packages(which are in form of a function) 

const jwt  =   require('jsonwebtoken');
const SECRET_KEY = 'dorons_secret_key';// used for JWT genrating(jwt.sign) and verifying(jwt.verify)
//const bcrypt = require('bcryptjs');

let jwt_uid;  // JWT user id 
let jwt_utype;// JWT user type 


// USERS ACCESS LEVELS
//user_reg: 3, admin_lo:2,   admin_hi:1
const free_routes = [
	'/api/orders/count', 
	'/api/products/count', 

	// '/api/signin/check_id_isnt_used/:user_id',
	'/api/signin' ,
	'/api/login' , 

	'/api/address/cities',
	'/api/address/st_of_city/:city_name'
] 

const user_routes = [ 
	'/api/update_user/update/:user_id', 
	'/api/update_user/get1',
	'/api/users/user_details/:user_id',
	'/api/update_user_last_login/:user_id',

	'/api/products/by_type/:product_type_code',
	'/api/types',
	
	'/api/products/all',
	'/api/products/by_type/:product_type_code', 
	'/api/products/get1/:product_code',


	'/api/carts/open/last5/by_user/:user_id',
	'/api/carts/submited/last5/by_user/:user_id', 
	'/api/carts/new',
	'/api/carts/update',
	'/api/cart/del/:cart_no',
	
	'/api/cart_items/del/:cart_item_no',
	'/api/cart_items/of_cart/:cart_no',
	'/api/cart_items/new',
	'/api/cart_items/update/',

	'/api/orders/by_user/:user_id',
	'/api/orders/new',
	'/api/orders/update/:order_no',

	'/api/ship/count_dates',
]

const admin2routs = [
	'/api/products/del/:product_code', 
	'/api/products/new', 
	'/api/products/update/:product_code', 
	'/api/products/get1_2admin'
] // '/api/products' - causes bug when lower level users query some routs that begins with'/api/products'
 

const admin1routs = [ 
	'/api/users/get1_2admin/:user_id', 
	'/api/users/all', 
	'/api/users/del/:user_id', 
	'/api/users/new', 
	'/api/users/update_by_id/:user_id'
] //'/api/users/' - causes bug when lower level users query some routs that begins with '/api/users'


let rout_was_aproved = false;
 


// 1. Free Routes: executed every time the app receives a request which is considered Free for anybody. 
// this middleware Function do noting and pass the route to be executed
app.use(free_routes, (req, res, next) => {
	console.log('midlwar: free_route',req.originalUrl) 
	rout_was_aproved = true; 
	next()
})

app.use( (req, res, next) => {
	console.log('midlwar: originalUrl: ',req.originalUrl);
	
	if (rout_was_aproved) next();
	else{
		const auth_header = req.headers.authorization;

		if (!auth_header) {
			console.log('midlwar: Url: ',req.baseUrl,' request without Authorization section in header! access denied');
			rout_was_aproved = false; 
			res.status(403).json('Forbidden (No Authorization section in Header)')

		} else {
			const token = auth_header.split(' ')[1];
			//console.log('midlwar: token',token)
			if(!token) {
				console.log('midlwar: No authenticating Token');
				rout_was_aproved = false; 
				res.status(403).json('Forbidden (No Token)')			
			} else{		
				jwt.verify(token, SECRET_KEY, (err, token_info) => {
					if (err) {
						console.log('midlwar: Token Is Not Valid')	;
						rout_was_aproved = false; 
						if(err.name.toLowerCase().includes('expired')) {
							console.log('midlwar: Token Expired');
							res.status(401).json('Token Expired')
						} else {//if error(not verifyed)&&reson isnt expired token
							res.status(403).json('Unauthorized Token')
						}
					} else { //if token is valid (verifyed) 
						//console.log('midlwar: token_info:',token_info)
						jwt_uid = token_info.uid;
						jwt_utype = 1*token_info.utype;
						jwt_expire_at = token_info.exp;
						// console.log('midlwar: jwt_uid' , jwt_uid);
						// console.log('midlwar: jwt_utype', jwt_utype);			 
						// console.log('midlwar: jwt_expire_at', jwt_expire_at);
						next();
					}
				})
			}	
		}
	}
})




// Middleware Functions handling Users levels 

// Middleware Functions handling Users levels
//2. Rergular User Routs: executed every time the app receives a registered user level api request. 
check_user_reg_routes = app.use(user_routes, (req, res, next) => {
	//console.log('midlwar: Route of Rergular User(3). open for all User_types: 3,2,1. Check JWT') 
	//console.log("midlwar: user type in this request is:", jwt_utype);

	rout_was_aproved = true; 
	console.log("midlwar: OK: rout approved! for User_types: 3,2,1" );
	next()
})

// 3. Admin-low : executed when app receives api request that can be accessed by admin of low level.
check_admin2_routes = app.use(admin2routs, (req, res, next) => {
	// console.log('midlwar: Route of admin-lo(2). for User_types: 2,1. Check JWT') // 
	// console.log("midlwar: user type in this request is:", jwt_utype);

	if (jwt_utype > 2 ) {
		console.log("midlwar: user is registered but Unauthorized to access this route ");
		rout_was_aproved = false;
		res.status(403).json('registered but Unauthorized')
	} else{ 
		console.log("midlwar: OK: rout approved! for admins: 2 / 1" );
		rout_was_aproved = true; 
		next()
	}
})


// 3. Admin-Hi : executed when app receives api request that can be accessed by admin of Hi level.
check_admin1_routes = app.use(admin1routs, (req, res, next) => {
	// console.log('midlwar: Route of admin-hi. only for User_type 1. Check JWT') // 
	// console.log("midlwar: user type in this request is:", jwt_utype);

	if (jwt_utype > 1 ) {
		console.log("midlwar: user is registered but Unauthorized to access this route ");
		rout_was_aproved = false;
		res.status(403).json('registered but Unauthorized')
	} else{ 
		console.log("midlwar: OK: rout approved! for admin level1 only" );
		rout_was_aproved = true; 
		next()
	}
})
 
// 5. Check All requests

// Middleware Function: with no mount path: The function is executed for any api request.
// this is the last Middleware Function. it work only after the all USERS ACCESS middlewares (free_routes, user routs, admin 1/2 routs)
// the middleware block a request that is not matching any aproved rout (aproved: free or user or admin) and sends a 404 error response
app.use( (req, res, next) => {

	if ( rout_was_aproved ){ // do nothing/ let the request continue
		// console.log('midlwar: OK: Its a listed request',req.originalUrl );
		rout_was_aproved = false;
		next()
	}
	else {
		console.log('midlwar: BLOK! this request is not part of listed pathes to access this server ',req.originalUrl );
		res.status(404).json('request URL has been refused');
	}
})
module.exports = { app }

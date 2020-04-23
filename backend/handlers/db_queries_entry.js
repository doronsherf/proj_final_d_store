/*
QUERIES FILES
	A. entry queries: user(signin+login+update),site info in file: db_queries_entry
	B. admin queries: in file: db_queries_admin
	C. buyer queries: in file: db_queries_buyer

QUERIES of this file
	SIGNIN LOGIN QUERIES
		0.1 CHECK IF USER ID IS USED 
		0.2 SIGNIN 
		0.3 LOGIN  
		0.4 FUNCTION update_time_of_user_last_login - executed by function directly in this file 


	USERS QUERIES
		1.1 Get USER details BY user
		1.6 UPDATE A USER with hushed id( bcrypt) 
	GENERAL INFO QUERIES
		8.1 COUNT orders --> general info for storeInfo component
		8.3 COUNT products  --> for storeInfo component
*/

const express = require('express');
const app = express();

//// CONNECTION TO DATABASE 
const db = require("../config/db_config.js");
const conction2 =  db.conction2;

//// JWT + bcrypt
const jwt  =   require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'dorons_secret_key';// used for JWT genrating(jwt.sign) and verifying(jwt.verify)
let jwt_uid;  // JWT user id 
let jwt_utype;// JWT user type 

//0.1 CHECK IF USER ID IS USED (for signin)
const check_id_isnt_used = (req, res) => {
	console.log("'db_queries_entry','check_id_isnt_used' - begin ");
	
	let sql_query1 = 'SELECT * FROM users WHERE user_id = ?';
	let sql_query2 = [req.params.user_id];
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('DB_Q_entry Id isnt Registered!!')
				res.json('free id');
			} else {
				console.log('DB_Q_entry This ID is already used')
				res.json('This ID is already used'); 
			} 
		} else
            console.log("ERROR in 'check_id_isnt_used': " + err); 
    });
};

//0.2 SIGNIN  
const signin = (req, res) => { 
	console.log("'DB_q_Entry' start post signin");
 	if (req.body) console.log("body identified"); 
	else console.log("NOT identify'req.body'! ") ;

	console.log('DB_Q_entry req.body.user_id("DB_q_Entry"):' , req.body.user_id);
	console.log('DB_Q_entry req.body.user_pwd("DB_q_Entry"):' , req.body.user_pwd);
	let orignl_pwd =  req.body.user_pwd;

		// HASH THE PASSWORD 
		//step A: Generate the salt
		bcrypt.genSalt(10, (err,salt)=> {
			console.log('DB_Q_entry salt',salt);
			if (err) throw err;

			//step B  generate hash of(password+salt)
			bcrypt.hash(orignl_pwd, salt,(error,hashed) => {
				console.log('DB_Q_entry bcrypt.hash work');
				
				if(error)  { 
					console.log('DB_Q_entry bcrypt_hash err00',err);
					throw err;
				}
				if(hashed) {
				 // replace password with hashed
					req.body.user_pwd =  hashed;

					let sql_query = `INSERT INTO  
					 users (
						user_id 		,
						user_pr_name 	,  
						user_fam_name 	,
						user_email		,	
						user_tel1 		,	
						user_tel2 		,		
						user_street 	,	
						user_city 		,
						user_st_number 		,	
						user_st_info 	,
						user_type 		,	
						user_pwd 		)	
					 VALUES(  
						'${req.body.user_id}',
						'${req.body.user_pr_name}',  
						'${req.body.user_fam_name}',
						'${req.body.user_email}',	
						'${req.body.user_tel1}',	
						'${req.body.user_tel2}',		
						'${req.body.user_street}',	
						'${req.body.user_city}',
						'${req.body.user_st_number}',	
						'${req.body.user_st_info}',
						'${req.body.user_type}',	
						'${req.body.user_pwd }'  
					 )`
					
					//insert new user (with the hashed_pwd) to DB
					conction2.query( sql_query, (err, data, fields) => {
						if (!err)  {
							console.log("executing conction2.query Inserted new user")
							console.log('DB_Q_entry Insert new user: ' , `${req.body.user_pr_name}`, 'pwd:', `${req.body.user_pwd}`) 
							console.log('DB_Q_entry orignl_pwd:',orignl_pwd);
							console.log('DB_Q_entry hashed_pwd:',hashed);
							res.send({msg:'Inserted new user!', 'User Id': `${req.body.user_id}`});	
						}		
						else {
							console.log("'signin' error: " + err);
							res.status(500).json("'Signin' Server Error"); 
							}
					});//close conction2.query
						//return console.log("executing conction2.query Inserted new user")
				} //close if(hashed)

			});// close bcrypt.hash
		});	// close bcrypt.genSalt(
			
};	

//0.3 LOGIN handle users with hashed pwd - sends minimal data(id+JWT+JWT_expire_time)
const login = (req, res) => {
	console.log("'db_queries_entry','login' - begin ");
	let sql_query1 = 'SELECT * FROM users WHERE (user_id = ?)';
	let sql_query2 = [req.params.user_id];
	
	conction2.query(sql_query1,sql_query2, (err, data) => {
		console.log('DB_Q_entry err',err);
		console.log('DB_Q_entry data',data);

		if(err) { 										//*** Server Error
			console.log("'login' ERROR: " + err)
			return res.status(500).json("'login' Server Error"); 

			
		} else if (data.length < 1 ) { 	 				//*** ID NOT found
			console.log('DB_Q_entry ID NOT found!')
			return res.status(401).json('ID NOT found'); 
		} else { 
			let pwd2check =  req.params.password
			let hash_from_db = data[0].user_pwd
			console.log('DB_Q_entry ID is OK!, ID: ',data[0].user_id)

			bcrypt.compare(pwd2check, hash_from_db, (err, is_match) => {
				if(is_match){ //*** password is OK
					console.log('DB_Q_entry password is OK')

					// update password in user object
					let user = data[0]
					user.user_pwd = pwd2check

					console.log('DB_Q_entry user_id_retrived' , user.user_id);
					console.log('DB_Q_entry user_type_retrived', user.user_type);	 
					console.log('DB_Q_entry user_name_retrived', user.user_pr_name);

					// Generate JWT(for this session)
					// const expire_time = 60 * 60;// 1hour
					const expire_time =  15 * 60  // 15 minutes


					const  access_token  =  jwt.sign(
						{ uid: user.user_id , utype:user.user_type , u_pr_name:user.user_pr_name }, 
						SECRET_KEY, 
						{expiresIn:expire_time}
					);
				
					console.log('DB_Q_entry access Token:(isued in ):',access_token);

					
					// TEST JWT.verify in login. just for development. temporary check. extract (id+type)from token
						jwt.verify(access_token, SECRET_KEY, (err, user_verifyed) => {
						if (err) {
							console.log('DB_Q_entry Not valid access_token')	;
							next(err).status(403).json('Unauthorized Token')	
							
						} else{
							//update_user_last_login_func(user_verifyed.uid)
							update_time_of_user_last_login(user_verifyed.uid)
							jwt_uid = user_verifyed.uid;
							jwt_utype = 1*user_verifyed.utype;
							jwt_pr_name = user_verifyed.u_pr_name;
							jwt_expiresIn = user_verifyed.expiresIn;
							console.log('DB_Q_entry jwt_uid ' , jwt_uid);
							console.log('DB_Q_entry jwt_utype', jwt_utype);	 
							console.log('DB_Q_entry jwt_pr_name', jwt_pr_name);	 
							console.log('DB_Q_entry jwt_expiresIn', jwt_expiresIn);	 
						}
					});

				// response: send the JWT to frontend 
					res.send({ "user_id":user.user_id, "user_pr_name":user.user_pr_name, "user_type":user.user_type, "access_token":  access_token, "expires_in": expire_time});
				}

				if(!is_match){ 								//*** Wrong Password
					console.log('DB_Q_entry DB_Q_entryWrong Password',req.params.password)
					res.status(401).json('Wrong Password'); 
				}
			});
		}
	}) 		
};

//0.4 FUNCTION update_time_of_user_last_login // uptate: user_last_login to: current_timestamp();
function update_time_of_user_last_login(usr_id){
	console.log('DB_Q_entry starting func.update_time_of_user_last_login');
	let sql_query00 = "UPDATE users SET user_last_login = CURRENT_TIMESTAMP WHERE user_id = '"+usr_id+"'";

	conction2.query(sql_query00, function(err, res){
		  if (err){ 
			console.log("DB_Q_entry ERROR in func.'update_time_of_user_last_login'",err);
		  }
		  if (!err){ 
			console.log('DB_Q_entry func. update_time_of_user_last_login-> Uptated!')  
		}
  })
}

//1.1 Get USER details BY user
const user_details =  (req, res) => {
	let sql_query1 = 'SELECT * FROM users WHERE user_id = ?';
	let sql_query2 = [req.params.user_id];
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('DB_Q_entry User NOT found!')
				res.json(data);
			} else {
				console.log('DB_Q_entry User retrieved :',data[0].user_id)
				res.json(data);
			} 
		} else
            console.log("DB_Q_entry ERROR in 'GET A user': " + err); 
    });
};

//1.6 UPDATE A USER with hushed id( bcrypt)
	const update_user =  (req, res) => {
	
		console.log('DB_Q_entry starting USER UPDATE USER!');
		if (req.body) console.log("body identified"); 
			else console.log("NOT identified") ;
	
		console.log('DB_Q_entry user_id was: ' + req.params.user_id);
		console.log('DB_Q_entry New user_id: ' + `${req.body.user_id}`);
		
		let id_was_updated = (req.params.user_id) !== (`${req.body.user_id}`);
		console.log('DB_Q_entry id was updated:',id_was_updated);
	
		// HASH THE PASSWORD 
		
		let orignl_pwd =  `${req.body.user_pwd}`;
		console.log('DB_Q_entry orignl_pwd',orignl_pwd);
		
		//step A: Generate the salt
		bcrypt.genSalt(10, (err,salt)=> {
			console.log('DB_Q_entry salt',salt);
			if (err) throw err;
	
			//step B  generate hash of(password+salt)
			bcrypt.hash(orignl_pwd, salt,(error,hashed) => {
				console.log('DB_Q_entry bcrypt.hash work');
	
				if(error)  { 
					console.log('DB_Q_entry bcrypt_hash err in "const update_user =" ',err);
					throw err;
				}
				if(hashed) {
				 // replace password with hashed
				 
					console.log('DB_Q_entry req.body.user_pwd BEFORE HASHED',req.body.user_pwd);
					req.body.user_pwd = hashed;
					console.log('DB_Q_entry req.body.user_pwd AFTER HASHED',req.body.user_pwd);
		
					let sql_query1 = `UPDATE users
						SET 
							user_id 		=?,
							user_pr_name 	=?,  
							user_fam_name 	=?,
							user_email		=?,	
							user_tel1 		=?,	
							user_tel2 		=?,		
							user_street 	=?,	
							user_city 		=?,
							user_st_number 		=?,	
							user_st_info 	=?,
							user_type 		=?,	
							user_pwd 		=?	
						WHERE 
						user_id = ${req.params.user_id}`;
				
					let sql_query2 = 
						[  
							`${req.body.user_id}`,
							`${req.body.user_pr_name}`,  
							`${req.body.user_fam_name}`,
							`${req.body.user_email}`,	
							`${req.body.user_tel1}`,	
							`${req.body.user_tel2}`,		
							`${req.body.user_street}`,	
							`${req.body.user_city}`,
							`${req.body.user_st_number}`,	
							`${req.body.user_st_info}`,
							`${req.body.user_type}`,	
							`${req.body.user_pwd}`   
						];
				
						conction2.query( sql_query1,sql_query2, (err, data, fields) => {
							if (!err)  {
								if (id_was_updated) { 
									console.log('DB_Q_entry Previous User user_id: ' + req.params.user_id);
									console.log('DB_Q_entry UPDATED User have new user_id: ' , `${req.body.user_id}`);
									res.send({'Previous User user_id' : req.params.user_id, 'UPDATED User new user_id': `${req.body.user_id}`});
								} else {
									console.log('DB_Q_entry UPDATED user_id: ',`${req.body.user_id}`);
									res.send({msg:'Updated', 'user_id': `${req.body.user_id}`});	
								}			
							}          
							else console.log(" ERROR in 'upate user (by id)': " + err);
						}); //close conction2.query
				} //close if(hashed)
			});// close bcrypt.hash
		});	// close bcrypt.genSalt(
	};//close app.put

//8.1 COUNT orders --> general info for storeInfo component
const count_orders =  (req, res) => {
	
	let sql_query = `
		SELECT COUNT(*) AS 'orders_count'
		FROM orders; `
    conction2.query(sql_query, (err, data) => {
        if (!err){	
			console.log('DB_Q_entry orders_count', data);				
			res.json(data);
		}
	
        else 
			console.log("DB_Q_entry ERROR: in COUNT orders : " + err); 
    });
};


//8.3 COUNT products  --> general info for storeInfo component
const count_products = (req, res) => {
	
	let sql_query = `
		SELECT COUNT(*) AS 'products_count'
		FROM products; `

    conction2.query(sql_query, (err, data) => {
        if (!err){	
			console.log('DB_Q_entry products_count', data);				
			res.json(data); 
		}
        else 
		console.log("DB_Q_entry ERROR: in COUNT orders : " + err); 
    });
};


module.exports = {app}

module.exports.check_id_isnt_used = check_id_isnt_used;// OK!
module.exports.signin = signin;// OK!
module.exports.login = login;

module.exports.user_details = user_details;
module.exports.update_user = update_user;

module.exports.count_orders = count_orders;
module.exports.count_products = count_products;






/*
////QUERIES 
B. admin queries: this file: db_queries_admin
A. entry queries : user(signin+login+update),site info: in file: db_queries_entry
C. buyer queries: in file: db_queries_buyer
*/

/*////QUERIES - handeled in this file

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

//// CONNECTION TO DATABASE ********************** 
const db = require("../config/db_config.js");
const conction2 =  db.conction2;

//1.1A Get A USER BY user_id

const get_user2admin =  (req, res) => {
	let sql_query1 = 'SELECT * FROM users WHERE user_id = ?';
	let sql_query2 = [req.params.user_id];
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr User NOT found!')
				res.json(data);
			} else {
				console.log('DB_Q_Byr User retrieved :',data[0].user_id)
				res.json(data);
			} 
		} else
            console.log("DB_Q_Byr ERROR in 'GET A user': " + err); 
    });
};

//1.2 Get ALL USERS
const get_all_users =  (req, res) => {
	let sql_query = 'SELECT * FROM users ORDER BY user_last_login DESC';
    conction2.query(sql_query, (err, data) => {
        if (!err){
			console.log('DB_Q_adm ALL users retrieved!')
			res.json(data); // res.send(data);
		}
        else
		console.log("DB_Q_adm ERROR in 'GET ALL users': " + err); 
    });
};

//1.4A DELETE A user BY user_id
const del_user = (req, res) => {

	let sql_query1 = 'DELETE FROM users WHERE user_id = ?';
	let sql_query2 = [req.params.user_id];
	conction2.query( sql_query1,sql_query2, (err, data, fields) => {
		if (!err){
			console.log('DB_Q_adm User Deleted!!');			
			res.send({msg:'Deleted successfully!!' , Data:data});
		}
		else
			console.log("ERROR in DELETE A user by id: " + err); 
	});
}; 

//1.5 INSERT NEW user
const new_user = (req, res) => {  

	console.log('DB_Q_adm  start Insert new user!');
	if (req.body) console.log("DB_Q_adm  body identified"); 
	else console.log("DB_Q_adm  NOT identify'req.body'! ") ;
	
	console.log('DB_Q_adm  req.body:' , req.body);

		// HASH THE PASSWORD 
		let orignl_pwd =  `${req.body.user_pwd}`;
		console.log('DB_Q_adm orignl_pwd',orignl_pwd);

		//step A: Generate the salt
		bcrypt.genSalt(10, (err,salt)=> {
			console.log('DB_Q_adm salt',salt);
			if (err) throw err;

			//step B  generate hash of(password+salt)
			bcrypt.hash(orignl_pwd, salt,(error,hashed) => {
				console.log('DB_Q_adm bcrypt.hash work');
				
				if(error)  { 
					console.log('DB_Q_adm bcrypt_hash err93',err);
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
						user_st_number 	,	
						user_st_info 	,
						user_type 		,	
						user_pwd 		,	
						user_last_login	)	
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
						'${req.body.user_pwd}',	
						'${req.body.user_last_login}'   
					 )`
					//insert new user (with the hashed_pwd) to DB
					conction2.query( sql_query, (err, data, fields) => {
						if (!err)  {
							console.log('DB_Q_adm  Insert new user: ' , `${req.body.user_pr_name}`) 
						
							res.send({msg:'Inserted new user!', 'User Id': `${req.body.user_id}`});	
						}          
						else {
							console.log("DB_Q_adm  'post new user' error: " + err);
							res.status(500).json("'Insert new user' Server Error"); 
						}
					});//close conction2.query
				} //close if(hashed)
			});// close bcrypt.hash 	
		});	// close bcrypt.genSalt(
};

//1.6B UPDATE A USER by user_id  
const update_user =  (req, res) => {

	console.log('DB_Q_adm  starting UPDATE user!');
	if (req.body) console.log("DB_Q_adm  body identified"); 
		else console.log("DB_Q_adm  NOT identified") ;

	console.log('DB_Q_adm  Previous user_id: ' + req.params.user_id);
	console.log('DB_Q_adm  current user user_id: ' + `${req.body.user_id}`);

	let id_was_updated = (req.params.user_id) !== (`${req.body.user_id}`);
	console.log('DB_Q_adm  id was updated:',id_was_updated);

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
			user_st_number 	=?,	
			user_st_info 	=?,
			user_type 		=?,	
			user_pwd 		=?,	
			user_last_login	=?	
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
			`${req.body.user_pwd}`,	
			`${req.body.user_last_login}`   
		];

		conction2.query( sql_query1,sql_query2, (err, data, fields) => {
			if (!err)  {
				if (id_was_updated) { 
					console.log('DB_Q_adm  Previous User user_id: ' + req.params.user_id);
					console.log('DB_Q_adm  UPDATED User have new user_id: ' , `${req.body.user_id}`);
					res.send({'Previous User user_id' : req.params.user_id, 'UPDATED User new user_id': `${req.body.user_id}`});
				} else {
					console.log('DB_Q_adm  UPDATED user_id: ',`${req.body.user_id}`);
					res.send({msg:'Updated', 'user_id': `${req.body.user_id}`});	
				}			
		}          
		else console.log("DB_Q_adm   ERROR in 'upate user (by id)': " + err);
	});
};

//2.3 INSERT NEW PRODUCT-TYPE 
const new_prod_type =  (req, res) => { 

	console.log('DB_Q_adm req.body: ',req.body)
	console.log(req.body.product_type_code)
	
	let sql_query = `INSERT INTO 
		products_types (
			product_type_name,
			product_type_code ) 
		VALUES(  
			'${req.body.product_type_name}',
			${req.body.product_type_code} ) `
	
	conction2.query( sql_query, (err, data, fields) => {
		if (!err) { 
			console.log('DB_Q_adm Inserted new type!')   
			res.send({msg:'Inserted new type' , Data:data});	
		}          
		else 
			console.log("ERROR in 'post new type': " + err); 
	});	
};

//3.3 Get A PRODUCT
const get_product2admin = (req,res) => { 

	let sql_query1 = 'SELECT * FROM products WHERE product_code = ?';
	let sql_query2 = [req.params.product_code];
	
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('DB_Q_adm Product NOT found!')
				res.json(data);
			} else{
				console.log('DB_Q_adm procuct retrieved :',data)
				res.send(data);
			}
		}
		else 
			console.log("ERROR in GET A PRODUCT: " + err); 
    });
};

//3.5 DELETE A PORDUCT BY: product_code
const del_product =  (req, res) => { 
	let sql_query1 = 'DELETE FROM products WHERE product_code = ?';
	let sql_query2 = [req.params.product_code];
	conction2.query( sql_query1,sql_query2, (err, data, fields) => {
		if (!err){
			console.log('DB_Q_adm Product Deleted!!!');			
			res.send({msg:'Deleted successfully!!!' , Data:data});
		}
		else
			console.log("ERROR in DELETE A PRODUCT!!!: " + err); 
	});
}; 

//3.6 INSERT NEW PRODUCT
const new_product =  (req, res) => { 

	console.log('DB_Q_adm starting put Insert new product!');
	if (req.body) console.log("'const new_product ='INSERT body identified",req.body); 
	else console.log("NOT 'req.body' identified") ;
	console.log('DB_Q_adm req.body:' , req.body);

	let sql_query = `INSERT INTO 
		products (
			product_code	,	
			product_barcode	,	
			product_type_code,	
			product_name	,	
			product_descrptn,	
			product_img		,	
			product_unit_type,	
			manf_code		,	
			supl_code		,	
			currency		,	
			supl_list_price,	
			supl_last_price	,	
			selling_list_price,	
			selling_current_price	)
		VALUES(  
			'${req.body.product_code}',  
			'${req.body.product_barcode}',  
			'${req.body.product_type_code }',  
			'${req.body.product_name}',  
			'${req.body.product_descrptn}',  
			'${req.body.product_img }',  
			'${req.body.product_unit_type }',  
			'${req.body.manf_code }',  
			'${req.body.supl_code }',  
			'${req.body.currency}',  
			'${req.body.supl_list_price }',  
			'${req.body.supl_last_price }',  
			'${req.body.selling_list_price }',  
			'${req.body.selling_current_price}'    )`

	conction2.query( sql_query, (err, data, fields) => {
		if (!err)  {
			console.log('DB_Q_adm Inserted New product! ' , `${req.body.product_code}`)  
			res.send({msg:'Inserted new product!', 'Product Code': `${req.body.product_code}`});	
		}          
		else console.log("'post new product' error: " + err);
	}); 
};

//3.7 UPDATE A PRODUCT BY product_code
//Worning: when updating nothing, does NOT notify the front end. It is OK for this app, but not to any future app 
const update_product = (req,res) => { 

	console.log('DB_Q_adm starting UPDATE product!');
	if (req.body) console.log("'update_product ='UPDATE A body identified",req.body); 
		else console.log("NOT identified") ;
	 
	let code_was_updated = (req.params.product_code) !== (`${req.body.product_code}`);

	let sql_query1 = `UPDATE products
		SET
			product_code	=?,	
			product_barcode	=?,	
			product_type_code=?,	
			product_name	=?,	
			product_descrptn=?,	
			product_img		=?,	
			product_unit_type=?,	
			manf_code		=?,	
			supl_code		=?,	
			currency		=?,	
			supl_list_price=?,	
			supl_last_price	=?,	
			selling_list_price=?,
			selling_current_price=?
		WHERE 
			product_code = ${req.params.product_code}`;

	let sql_query2 = [ 
		`${req.body.product_code}`,  
		`${req.body.product_barcode}`,  
		`${req.body.product_type_code }`,  
		`${req.body.product_name}`,  
		`${req.body.product_descrptn}`,  
		`${req.body.product_img }`,  
		`${req.body.product_unit_type }`,  
		`${req.body.manf_code }`,  
		`${req.body.supl_code }`,  
		`${req.body.currency}`,  
		`${req.body.supl_list_price }`,  
		`${req.body.supl_last_price }`,  
		`${req.body.selling_list_price }`,  
		`${req.body.selling_current_price}`     
		// `${req.params.product_code}` 
	] ;

	conction2.query( sql_query1,sql_query2, (err, data, fields) => {
		if (!err)  {
			if (code_was_updated) { 
				console.log('DB_Q_adm Previous product code: ' + req.params.product_code);
				//console.log('DB_Q_adm UPDATED product code: ' , `${req.body.product_code}`);
				// select count(*) from table1 where country = 'country1'
				console.log('DB_Q_adm UPDATED product code: ' , `${req.body.product_code}`);
				res.send({'Previous product code':req.params.product_code, 'UPDATED Product Code': `${req.body.product_code}`});
			} else {
				console.log('DB_Q_adm UPDATED product code: ' , `${req.body.product_code}`);
				res.send({msg:'Updated', 'UPDATED Product Code': `${req.body.product_code}`});
				};  
		} else console.log("'update product' error: " + err);
	});
};

module.exports.app = app;

module.exports.get_user2admin = get_user2admin;
module.exports. get_all_users =  get_all_users;
module.exports.update_user = update_user;
module.exports.new_user = new_user;
module.exports.del_user = del_user;


module.exports.get_product2admin = get_product2admin;
module.exports.new_product = new_product;
module.exports.update_product = update_product;
module.exports.del_product = del_product;

module.exports.new_prod_type = new_prod_type;

/*

//1.3 Get A USER BY email
app.get('/api/users/email/:user_email', (req, res) => {
	let sql_query1 = 'SELECT * FROM users WHERE user_email = ?';
	let sql_query2 = [req.params.user_email];
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('admn_rut  User NOT found!')
				res.json(data);
			} else {
				console.log('admn_rut  User retrieved :',data[0].user_id)
				res.json(data);
			} 
		} else
            console.log("admn_rut  ERROR in 'GET A user': " + err); 
    });
});

//1.3B DELETE A user BY email
app.delete('/api/users/del/email/:user_email', (req, res) => {
	let sql_query1 = 'DELETE FROM users WHERE user_email = ?';
	let sql_query2 = [req.params.user_email];
	conction2.query( sql_query1,sql_query2, (err, data, fields) => {
		if (!err){
			console.log('admn_rut  User Deleted!');			
			res.send({msg:'Deleted successfully!!' , Data:data});
		}
		else
			console.log("admn_rut  ERROR in DELETE A user by mail: " + err); 
	});
}); 
*/

/*
//2.1 Get ALL PRODUCTS TYPES
app.get('/api/types', (req, res) => {
	let sql_query = 'SELECT * FROM products_types ORDER BY product_type_code ASC';
    conction2.query(sql_query, (err, data) => {
        if (!err){
			console.log('admn_rut  ALL types retrieved!')
			res.json(data); // res.send(data);
		}
        else
			console.log("admn_rut  ERROR in 'GET types': " + err); 
    });
});

//2.2 Get A TYPE BY product_type_code 
app.get('/api/types/get1/:product_type_code', (req, res) => {
	let sql_query1 = 'SELECT * FROM products_types WHERE product_type_code = ?';
	let sql_query2 = [req.params.product_type_code];
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('admn_rut  Type NOT found!')
				res.json(data);
			} else {
				console.log('admn_rut  Type retrieved :',data)
				res.json(data);
			} 
		} else
            console.log("admn_rut  ERROR in 'GET A Type': " + err); 
    });
});
*/ 
/*

//2.3 INSERT NEW PRODUCT-TYPE 
 app.put('/api/types/new', (req, res) => { 

	console.log('admn_rut  req.body: ',req.body)
	console.log(req.body.product_type_code)
	
	let sql_query = `INSERT INTO 
		products_types (
			product_type_name,
			product_type_code ) 
		VALUES(  
			'${req.body.product_type_name}',
			${req.body.product_type_code} ) `
	
	conction2.query( sql_query, (err, data, fields) => {
		if (!err) { 
			console.log('admn_rut  Inserted new type!')   
			res.send({msg:'Inserted new type' , Data:data});	
		}          
		else 
			console.log("admn_rut  ERROR in 'post new type': " + err); 
	});	
});
*/
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');// support encoded bodies

const data4db= require('../db/db_tabales_data_without_streets.js')
const data4db_st= require('../db/db_tabales_data_streets.js') 

const app = express();//



app.use(bodyparser.urlencoded({ extended: true }));// support encoded bodies: 'x-www-form-urlencoded'
app.use(bodyparser.json()); // support json encoded bodies
//let urlencodedParser = bodyparser.urlencoded({ extended: true }); //var to contein the parsed req.body (in post and update requests)
 
app.use(express.json());
app.use(cors())

// conction1: conect MySql running on this machin
let conction1 = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	// database: "dragstore_db", NOT defined
});
// conction2: conect MySql project 
let conction2 = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "dragstore_db",
	multipleStatements: true,
});

// 2.Chek if DB exist	
conction1.query("SHOW DATABASES WHERE  `Database` = 'dragstore_db'" , (err, data) =>{
		if(data.length==0) {//if dragstore_db NOT exists -> Creat DB and Tables(in the first time run)
			console.log("db_confg: 'db_config' did NOT found dragstore_db");
			create_db();
		}
		else {
			console.log("db_confg:  'db_config' OK1: found DB! -> dragstore_db");
			conect2db();
		}
		if(err) console.log('db_config err1:', err);
})

function conect2db(){
	conction2.connect((err) => {
		if (err) {
			console.log("db_confg:  'db_config' ERROR! DB connection2 error: ");
			console.log("db_confg: 'db_config' err.code IS ",err.code); 	
		} else {
			console.log("db_confg: 'db_config' OK2.1: Connected to MySqlDB:'dragstore_db' at: " + new Date().toLocaleTimeString() );
		}
	});
}

//// BUILD TABLES INSIDE THE EXISTING DATABSAE ******************************************
function create_db(){
	let create_db = 'CREATE DATABASE IF NOT EXISTS dragstore_db';
	conction1.query(create_db , (err, resulat ) =>{
		if(err) {
			console.log('db_confg: ERROR: DB "dragstore_db" was NOT created' );
			console.log(err);
		}
		else {
			console.log('db_confg: OK: DB "dragstore_db" created at: '+new Date().toLocaleTimeString()); 
			conction2.connect((err) => {
				if (err) {
					console.log("db_confg: ERROR2! MySqlDB connection2 error: ");
					console.log('db_confg: err.code IS ',err.code); 	

				} else {
					console.log("db_confg: OK2.0: Connected to MySqlDB:'dragstore_db' at: " + new Date().toLocaleTimeString());
					create_tables_with_data()
				}
			});
		}
	}); 
}

function create_tables_with_data(){
// DROP DATABASE dragstore_db
	let handled_tables = [];
	let restart_foreign_key_checks = setInterval(check_if_it_is_time_to_restart_foreign_key_checks, 1000);

	function check_if_it_is_time_to_restart_foreign_key_checks(){
		//console.log(handled_tables)
		if (handled_tables.length>6) {
			conction2.query('SET FOREIGN_KEY_CHECKS = 1', (err) => {
				if (!err) console.log('db_confg: FOREIGN_KEY_CHECKS enabled')
				if (err)  console.log('db_confg: Error When Try to enable FOREIGN_KEY_CHECKS!',err)
			});
			clearInterval(restart_foreign_key_checks);
		}
	};

	///CREATE TABLE1: USERS
	let create_tbl1 = `CREATE TABLE IF NOT EXISTS users (
		user_id			BIGINT NOT NULL,	
		user_pr_name   	VARCHAR(40) NOT NULL,
		user_fam_name 	VARCHAR(40) NOT NULL,
		user_email		VARCHAR(40) NOT NULL,
		user_tel1 		VARCHAR(40),
		user_tel2 		VARCHAR(40),
		user_street 	VARCHAR(40),
		user_city 		VARCHAR(40),
		user_st_number 	VARCHAR(20),
		user_st_info 	VARCHAR(1023),
		user_type 		INT(20),
		user_pwd 		VARCHAR(100),
		user_last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		PRIMARY KEY (user_id ),
		KEY ky_user_email (user_email)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;`
 
		conction2.query(create_tbl1 , (err) =>{
			if(err) {
				console.log('db_confg: ERROR: Table1 of 7, NOT created in the DB! at: '+new Date().toLocaleTimeString()); 
				handled_tables.push('tbl1 NOT created in the DB!');
			}
			else {
				console.log('db_confg: OK: "Table1"(USERS) created at: '+new Date().toLocaleTimeString());
				conction2.query(data4db.tbl1_data , (err) =>{
					if(err)  {
						console.log('db_confg: ERROR: Tbl1 insert data Failed at: '+new Date().toLocaleTimeString(),err);
						handled_tables.push('Tbl1 insert data Failed')
					}
					if(!err) {
						console.log('db_confg: Data inserted into "Tbl1"  at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl1 insert data OK')
					}
				})		 	
			}
		}); 
		

	///CREATE TABLE2: PRODUCTS TYPES  (the parent table for prod_typ_cod of the child table:products)
		let create_tbl2 = `CREATE TABLE IF NOT EXISTS products_types (
			product_type_code	INT AUTO_INCREMENT,
			product_type_name	VARCHAR(40) NOT NULL,
			PRIMARY KEY (product_type_code),
			UNIQUE INDEX (product_type_name)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;`
	//		product_type_name UNIQUE,

		conction2.query(create_tbl2 , (err) =>{
			if(err) {
				console.log('db_confg: ERROR: "Table2" of 7, NOT created in the DB! at: '+new Date().toLocaleTimeString());
				handled_tables.push('tbl2 NOT created in the DB!');
			}
			else {console.log('db_confg: OK: "Table2" of 7, created at: '+new Date().toLocaleTimeString())
			conction2.query(data4db.tbl2_data , (err) =>{
					if(err) {
						console.log('db_confg: ERROR: Tbl2 insert data FAILED at: '+new Date().toLocaleTimeString(),err);
						handled_tables.push('Tbl2 insert data Failed')
					}
					if(!err) {
						console.log('db_confg: Data inserted into "Tbl2"  at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl2 insert data OK')
					}
				}) 	 	
			}
		})


	///CREATE TABLE3: PRODUCTS
	let create_tbl3 = `CREATE TABLE IF NOT EXISTS products (
		product_code			INT AUTO_INCREMENT, 
		product_barcode			INT, 
		product_type_code		INT, 
		product_name			VARCHAR(100), 
		product_descrptn		VARCHAR(100), 
		product_img				VARCHAR(100), 
		product_unit_type		VARCHAR(20), 
		manf_code				INT NOT NULL, 
		supl_code				INT NOT NULL,
		currency				VARCHAR(10) DEFAULT 'NIS',
		supl_list_price			DECIMAL(10,2) , 
		supl_last_price			DECIMAL(10,2) , 
		selling_list_price		DECIMAL(10,2) , 
		selling_current_price	DECIMAL(10,2)  NOT NULL, 
		PRIMARY KEY (product_code),
		KEY ky_prod_type_code (product_type_code),
		CONSTRAINT fornky_products_product_type_code 
			FOREIGN KEY(product_type_code) 
			REFERENCES products_types (product_type_code) 
			ON DELETE SET NULL 
			ON UPDATE CASCADE,
		UNIQUE INDEX (product_barcode)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;`

		conction2.query(create_tbl3 , (err) =>{
			if(err) {
				console.log('db_confg: ERROR: "Table3" of 7, NOT created in the DB! at: '+new Date().toLocaleTimeString());				handled_tables.push('tbl3 NOT created in the DB!');
			}
			else {console.log('db_confg: OK: "Table3" of 7, created at: '+new Date().toLocaleTimeString())
				conction2.query(data4db.tbl3_data , (err) =>{
					if(err) {
						console.log('db_confg: ERROR: Tbl3 insert data FAILED at: '+new Date().toLocaleTimeString());						
						handled_tables.push('Tbl3 insert data Failed')
				}
					if(!err) {
						console.log('db_confg: Data inserted into "Tbl3"  at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl3 insert data OK')
					}
				}) 	 	
			}
		})
		
	///CREATE TABLE4: CARTS 
		let create_tbl4 = `CREATE TABLE IF NOT EXISTS carts (
			cart_no			INT AUTO_INCREMENT, 
			user_id			BIGINT NOT NULL, 
			cart_date		DATE NOT NULL, 
			cart_submited	tinyint(2) NOT NULL DEFAULT 0, 
			


			PRIMARY KEY (cart_no)
		
			 
			) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;`	
//CONSTRAINT fornky_carts_user_id,					KEY ky_user_id (user_id)

		conction2.query(create_tbl4 , (err) =>{
			if(err) {
				console.log('db_confg: ERROR: "Table4" of 7, NOT created in the DB! at: '+new Date().toLocaleTimeString());
				
				console.log('tbl4 err:',err);

				handled_tables.push('tbl4 NOT created in the DB!');
			}
			else {console.log('db_confg: OK: "Table4" of 7, created at: '+new Date().toLocaleTimeString())
				conction2.query(data4db.tbl4_data , (err) =>{
					if(err) {
						console.log('db_confg: ERROR: Tbl4 insert data FAILED at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl4 insert data Failed')
					}
					if(!err) {
						console.log('db_confg: Data inserted into "Tbl4"  at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl4 insert data OK')
					}
				}) 	 	
			}
		})

	///CREATE TABLE5: CART ITEMS
	let create_tbl5 = `CREATE TABLE IF NOT EXISTS cart_items (
		cart_item_no		INT AUTO_INCREMENT,
		cart_no				INT,
		product_code		INT,
		price				DECIMAL(10,2) NOT NULL, 
		qty					INT NOT NULL DEFAULT 0, 
		total_row			DECIMAL(10,2) NOT NULL, 
		PRIMARY KEY (cart_item_no ), 
		KEY ky_cart_no (cart_no),
		KEY ky_prod_code (product_code),
		CONSTRAINT fornky_carts_cart_no 
			FOREIGN KEY(cart_no)  
			REFERENCES carts (cart_no) 
			ON DELETE CASCADE 
			ON UPDATE CASCADE,
		CONSTRAINT fornky_carts_prod_code 
			FOREIGN KEY(product_code)  
			REFERENCES products (product_code) 
			ON DELETE SET NULL 
			ON UPDATE CASCADE
		) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;`

		conction2.query(create_tbl5 , (err) =>{
			if(err) {
				console.log('db_confg: ERROR: "Table5" of 7, NOT created in the DB! at: '+new Date().toLocaleTimeString());
				console.log('tbl5 err:',err);
				handled_tables.push('tbl5 NOT created in the DB!');
			}
			else {console.log('db_confg: OK: "Table5" of 7, created at: '+new Date().toLocaleTimeString())
				conction2.query(data4db.tbl5_data , (err) =>{
					if(err) {
						console.log('db_confg: ERROR: Tbl5 insert data FAILED at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl5 insert data Failed')
					}
					if(!err) {
						console.log('db_confg: Data inserted into "Tbl5"  at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl5 insert data OK')
					}
				}) 	 	
			}
		});

	///CREATE TABLE6: orders  
	let create_tbl6 = `CREATE TABLE IF NOT EXISTS orders (
		order_no		INT AUTO_INCREMENT,
		user_id			BIGINT NOT NULL,
		cart_no			INT ,
		order_total		DECIMAL(10,2)  NOT NULL,
		order_submited	tinyint(2) NOT NULL DEFAULT 0,
		order_date		DATE, 
		payment_id		VARCHAR(100),
		ship_date 		DATE, 
		ship_street		VARCHAR(100),
		ship_city		VARCHAR(100),
		ship_st_number	VARCHAR(10),
		ship_st_info	VARCHAR(800),
		ship_tel1		VARCHAR(40),
		ship_tel2		VARCHAR(40),
		PRIMARY KEY (order_no), 
		KEY ky_user_id (user_id),
		KEY ky_cart_no (cart_no), 
		CONSTRAINT fornky_orders_user_id 
			FOREIGN KEY(user_id)  
			REFERENCES users (user_id) 
			ON DELETE CASCADE 
			ON UPDATE CASCADE,
		CONSTRAINT fornky_orders_cart_no 
			FOREIGN KEY(cart_no)  
			REFERENCES carts (cart_no) 
			ON DELETE CASCADE 
			ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;`

		conction2.query(create_tbl6 , (err) =>{
			if(err) {
				console.log('db_confg: ERROR: "Table6" of 7, NOT created in the DB! at: '+new Date().toLocaleTimeString());		
				console.log('tbl6 err:',err);				
				handled_tables.push('tbl6 NOT created in the DB!');
			}
			else {console.log('db_confg: OK: "Table6" of 7, created at: '+new Date().toLocaleTimeString())
				conction2.query(data4db.tbl6_data , (err) =>{
					if(err) {
						console.log('db_confg: ERROR: Tbl6 insert data FAILED at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl6 insert data Failed')
					}
					if(!err) {
						console.log('db_confg: Data inserted into "Tbl6"  at: '+new Date().toLocaleTimeString());
						handled_tables.push('Tbl6 insert data OK')
					}
				}) 	 	
			}; 
		})
		
	///CREATE TABLE7: REHOVOT (addrresses) //Israel cities and streets government DB  
	let create_tbl7 = `CREATE TABLE IF NOT EXISTS rehovot (
		region_code 	varchar(32)	,
		region_name 	varchar(32) ,
		city_code 		varchar(32) ,
		city_name 		varchar(32) ,
		street_code 	varchar(32),
		street_name 	varchar(32) NOT NULL,
		street_name_status varchar(32) ,
		official_code 	varchar(32)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;`
	let st_errors_arr = []
	let st_ok_arr = []

	conction2.query(create_tbl7 , (err) =>{
		if(err) {
			console.log('db_confg: ERROR: "Table7"(rehovot)of 7, NOT created in the DB! at: '+new Date().toLocaleTimeString());
			handled_tables.push('tbl7 NOT created in the DB!');
		} else {
			
			console.log('db_confg: OK: "Table7" of 7, created at: '+new Date().toLocaleTimeString())
			conction2.query(data4db_st.tbl7_data_insert , (err) =>{
				if(err) {
					console.log('db_confg: ERROR: Tbl7 insert data FAILED at: '+new Date().toLocaleTimeString());
					handled_tables.push('Tbl07  insert data Failed')
				}
				if(!err) {
					console.log('db_confg: Data inserted into "Tbl7"  at: '+new Date().toLocaleTimeString());
					handled_tables.push('Tbl7 insert data OK')
				}
			}) 	 	
		}	
	})	
}

module.exports = { conction2 }

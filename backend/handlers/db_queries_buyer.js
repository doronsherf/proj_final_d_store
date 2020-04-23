/*
QUERIES FILES
	C. buyer queries: this file: db_queries_buyer
	A. entry queries : user(signin+login+update),site info: in file: db_queries_entry
	B. admin queries: in file: db_queries_admin

QUERIES in this file
	USERS QUERIES
		1.1 Get USER details BY user
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

		8.2 list dates with 3+ orders. (to block more shipments on these dates)
		
	*/

const express = require('express');
const app = express();

//// CONNECTION TO DATABASE 
const db = require("../config/db_config.js");
const conction2 =  db.conction2;



//1.1A Get USER details BY user_id
const user_details =  (req, res) => {
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

//2.1 Get ALL PRODUCTS TYPES
const get_all_prod_types = (req, res) => {
	let sql_query = 'SELECT * FROM products_types ORDER BY product_type_code ASC';
    conction2.query(sql_query, (err, data) => {
        if (!err){
			console.log('DB_Q_Byr ALL types retrieved!')
			res.json(data); // res.send(data);
		}
        else
			console.log("DB_Q_Byr ERROR in 'GET types': " + err); 
    });
};

//3.1 GET ALL PRODUCTS 
const get_all_products = (req, res) => {
	let sql_query = 'SELECT * FROM products';
    conction2.query(sql_query, (err, data) => {
        if (!err){
			console.log('DB_Q_Byr ALL procucts retrieved!!!')
			res.json(data);  
		}
        else
			console.log("DB_Q_Byr ERROR in 'GET ALL products': " + err); 
    });
};


//3.2 GET PRODUCTS FILTERED BY product_type_code
const products_by_type =  (req, res) => {
	let sql_query1 = 'SELECT * FROM products WHERE product_type_code = ?';
	let sql_query2 = [req.params.product_type_code];

    conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){	
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr NO Products were found!')
				res.json(data);
			}
			else{
				console.log('DB_Q_Byr Products By type retrieved!')
				res.json(data); // res.send(data);
		}
	}
        else 
			console.log("DB_Q_Byr ERROR in GET PRODUCTS by type : " + err); 
    });
};

//3.3 Get A PRODUCT by product_code for buyer level-do NOT enclude admine only info(retail_price etc.).
const get_product = (req,res) => { 
	let sql_query1 = `
	SELECT
		product_code,product_barcode,product_type_code,product_name,product_descrptn,product_img,product_unit_type,manf_code,currency,selling_list_price,selling_current_price
	FROM products 
	WHERE product_code = ?`;
	let sql_query2 = [req.params.product_code];
	
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr Product NOT found!')
				res.json(data);
			} else{
				console.log('DB_Q_Byr procuct retrieved :',data)
				res.send(data);
			}
		}
		else 
			console.log("DB_Q_Byr ERROR in GET A PRODUCT: " + err); 
    });
};


//4.2A GET LAST 5 carts of user THAT WERE NOT SUBMITED 
const last5open_carts = (req, res) => {
	let sql_query1 = 'SELECT * FROM carts WHERE (user_id=?) AND (cart_submited=0) ORDER BY cart_date DESC LIMIT 5';

	let sql_query2 = [req.params.user_id];
	
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr OPEN Cart NOT found!')
				res.json(data);
			} else{
				console.log('DB_Q_Byr Open Carts Retrieved :',data)
				res.send(data);
			}
		}
		else 
			console.log("DB_Q_Byr ERROR in GET OPEN CARTS: " + err); 
    });
};

//4.2B GET 5 LAST CARTS of user-THAT WERE SUBMITED  

const last5submited_carts = (req, res) => {
	let sql_query1 = 'SELECT * FROM carts WHERE user_id = ? AND (cart_submited=1) ORDER BY cart_date DESC LIMIT 5 ';
	let sql_query2 = [req.params.user_id];

    conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){	
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr NO submited carts were found!')
				res.json(data);
			}
			else{
				console.log('DB_Q_Byr limit 5 Carts By user retrieved!',data)
				res.json(data); // res.send(data);
		}
	}
        else 
			console.log("DB_Q_Byr 5 Carts By user-Error: " + err); 
    });
};


//4.5 INSERT NEW cart and get back cart_no
const new_cart =  (req, res) => { 
	// cart_no is not sent! the SQL auto incremente that value

	console.log('DB_Q_Byr starting post Insert new cart');
	if (req.body) console.log("DB_Q_Byr body identified"); 
	else console.log("DB_Q_Byr NOT identified 'req.body': ") ;
	
	console.log('DB_Q_Byr req.body:' , req.body);
	let sql_query = 
	`INSERT INTO
		carts (
			user_id,		
			cart_date, 
			cart_submited
		) VALUES (   
			'${req.body.user_id}',		
			'${req.body.cart_date}',      
			'${req.body.cart_submited}' );`
			
	conction2.query( sql_query, (err, data, fields) => {
		if (!err)  {
			console.log('DB_Q_Byr Inserted new cart! cart_no:' ,data.insertId);// LAST INSERTED ID			
			res.send({msg:'Inserted new cart!', cart_no: data.insertId});	
		}          
		else console.log("DB_Q_Byr 'new cart'(post) error: " + err);
	});
};
		
//4.6 update 'cart was submited'	 
const cart_updated =  (req, res) => {

	console.log('DB_Q_Byr starting UPDATE cart');
	if (req.body) console.log("DB_Q_Byr body identified"); 
		else console.log("DB_Q_Byr NOT identified") ;

	let sql_query = `UPDATE carts
		SET
			cart_submited = ${req.body.cart_submited}
		WHERE 
			cart_no = ${req.body.cart_no}`;

	conction2.query( sql_query,(err, data, fields) => {
		if (!err)  {
			console.log('DB_Q_Byr UPDATED cart no.: ' , `${req.body.cart_no}`);
			res.send({msg:'UPDATED, cart was submited', 'cart no.' :`${req.body.cart_no}`});		 
		} else console.log("DB_Q_Byr 'update cart' error: " + err);
	});
};


//4.7 DELETE A cart BY cart_no 

const del_cart =  (req, res) => {
	let sql_query1 = 'DELETE FROM carts WHERE cart_no = ?';
	let sql_query2 = [req.params.cart_no];
	conction2.query( sql_query1,sql_query2, (err, data, fields) => {
		if (!err){
			console.log('DB_Q_Byr cart Deleted!',req.params.cart_no);			
			res.send({msg:'cart Deleted successfully!!' , Data:data});
		}
		else
			console.log("DB_Q_Byr ERROR in DELETE A cart: " + err); 
	});
}; 

//5.2 DELETE A cart_item BY: PK(cart_item_no)  
const del_cart_item = (req, res) => {
	let sql_query1 = 'DELETE FROM cart_items WHERE cart_item_no = ?';
	let sql_query2 = [req.params.cart_item_no];
	conction2.query( sql_query1,sql_query2, (err, data, fields) => {
		if (!err){
			console.log('DB_Q_Byr cart_item Deleted!',data);			
			res.send({msg:'Deleted successfully!!' , Data:data});
		}
		else
			console.log("DB_Q_Byr ERROR in DELETE A cart_item: " + err); 
	});
}; 

//5.3 GET cart_items of a cart
//app.get('/api/cart_items/of_cart/:cart_no', (req, res) => {
const cart_items_of_cart = (req, res) => {
	let sql_query1 = 'SELECT * FROM cart_items WHERE cart_no = ?';
	let sql_query2 = [req.params.cart_no];

    conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){	
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr NO cart items were found for cart No.:',req.params.cart_no)
				res.json(data);
			}
			else{
				console.log('DB_Q_Byr Cart no.',req.params.cart_no, 'items retrieved')
				res.json(data); // res.send(data);
		}
	}
        else 
			console.log("DB_Q_Byr ERROR in GET items of cart: "+ req.params.cart_no + err); 
    });
};

//5.4 INSERT NEW cart_item
const new_cart_item = (req, res) => { 

	console.log('DB_Q_Byr starting post Insert new C-item!');
	if (req.body) console.log("DB_Q_Byr body identified"); 
	else console.log("DB_Q_Byr NOT identified 'req.body': ") ;
	
	console.log('DB_Q_Byr req.body:' , req.body);

	let sql_query = `INSERT INTO
		cart_items (
			cart_item_no, 
			cart_no, 
			product_code, 
			price, 
			qty, 
			total_row
		) VALUES (  
			'${req.body.cart_item_no}', 
			'${req.body.cart_no}', 
			'${req.body.product_code}', 
			'${req.body.price}', 
			'${req.body.qty}', 
			'${req.body.total_row}'   
		)`

	conction2.query( sql_query, (err, data, fields) => {
		if (!err)  {
			console.log('DB_Q_Byr Inserted new cart_item: ' , `${req.body.cart_item_no}`)  
		
			res.send({msg:'Inserted new cart_item!', 'cart_item_no': data.insertId });	
		}          
		else console.log("DB_Q_Byr 'post new cart item' error: " + err);
	});
};

//5.5 UPDATE cart_item
const update_cart_item = (req, res) => { 
	console.log('DB_Q_Byr starting put update C-item!');
	if (req.body) console.log("DB_Q_Byr body identified"); 
	else console.log("DB_Q_Byr NOT identified 'req.body': ") ;
	
	console.log('DB_Q_Byr req.body:' , req.body);
	console.log('DB_Q_Byr `${req.body.cart_no}`:' , `${req.body.cart_no}`);
	console.log('DB_Q_Byr req.body.cart_item_no :' , req.body.cart_item_no);
	
	let sql_query = 'UPDATE cart_items SET cart_no =' +req.body.cart_no + ', product_code =' + req.body.product_code+ ', price =' +req.body.price+ ', qty =' + req.body.qty+ ', total_row =' +req.body.total_row + ' WHERE cart_item_no =' +req.body.cart_item_no 
	
	let sql_query2 = `UPDATE cart_items 
		SET 
			cart_no = req.body.cart_no  , 
			product_code =  req.body.product_code, 
			price = req.body.price , 
			qty = req.body.qty , 
			total_row = req.body.total_row   
		WHERE 
		cart_item_no = req.body.cart_item_no `
	
	conction2.query( sql_query, (err, data, fields) => {
		if (!err)  {
			console.log('DB_Q_Byr Updateded cart_item: ' , `${req.body.cart_item_no}`)  
		
			res.send({msg:'Updated cart_item!', 'cart_item_no': `${req.body.cart_item_no}`});	
		}          
		else console.log("DB_Q_Byr 'Updated cart item' error: " + err);
	});
};

//6.2 GET LAST 5 ORDERS OF USER 
const last5orders =  (req, res) => {
	let sql_query1 = 'SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC LIMIT 5 ';
	let sql_query2 = [req.params.user_id];

    conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){	
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr NO Orders were found!')
				res.json(data);
			}
			else{
				console.log('DB_Q_Byr 5 Orders By user retrieved!')
				res.json(data); // res.send(data);
		}
	}
        else 
			console.log("DB_Q_Byr ERROR in GET orders of a user : " + err); 
    });
};

//6.3 INSERT NEW order and get back order_no // POST NEW ORDER
const new_order = (req, res) => { 
	// order_no, is not sent
	// the SQL auto incremente that value
	console.log('DB_Q_Byr starting post Insert new order');
	if (req.body) console.log("DB_Q_Byr body identified"); 
	else console.log("DB_Q_Byr NOT identified 'req.body': ") ;
	
	console.log('DB_Q_Byr req.body:' , req.body);
	let sql_query = 
	`INSERT INTO
		orders (
			user_id		,
			cart_no		,
			order_total	,
			order_submited,
			order_date	,
			payment_id	,
			ship_date	,
			ship_street	,
			ship_city	,
			ship_st_number,
			ship_st_info,
			ship_tel1	,
			ship_tel2	
		) VALUES (   
			'${req.body.user_id		}',		
			'${req.body.cart_no		}',		
			'${req.body.order_total	}',		
			'${req.body.order_submit}',		
			'${req.body.order_date	}',		
			'${req.body.payment_id	}',		
			'${req.body.ship_date	}',		
			'${req.body.ship_street	}',		
			'${req.body.ship_city	}',		
			'${req.body.ship_st_numb}',		
			'${req.body.ship_st_info}',		
			'${req.body.ship_tel1	}',		
			'${req.body.ship_tel2	}' );`	
		     		
	conction2.query( sql_query, (err, data, fields) => {
		if (!err)  {
			console.log('DB_Q_Byr Inserted new order! order no:' ,data.insertId);// LAST INSERTED ID			
			res.send({msg:'Inserted new order!', order_no: data.insertId});	
		}          
		else console.log("DB_Q_Byr 'new order'(post) error: " + err);
	});
};

//6.4 UPDATE ORDER
const update_order = (req, res) => {
	console.log('DB_Q_Byr starting UPDATE order!');
	if (req.body) console.log("DB_Q_Byr body identified"); 
		else console.log("DB_Q_Byr NOT identified") ;

	let sql_query1 = `UPDATE orders
		SET
			user_id			=?,	
			cart_no			=?,	
			order_total		=?,	
			order_submited	=?,	
			order_date		=?,	
			payment_id		=?,	
			ship_date		=?,	
			ship_street		=?,	
			ship_city		=?,	
			ship_st_number	=?,	
			ship_st_info	=?,	
			ship_tel1		=?,	
			ship_tel2		=?

		WHERE 
			order_no = ${req.params.order_no}`;

	let sql_query2 = [ 
		`${req.body.user_id		     }`, 
		`${req.body.cart_no		     }`, 
		`${req.body.order_total	     }`, 
		`${req.body.order_submited   }`, 
		`${req.body.order_date	     }`, 
		`${req.body.payment_id	     }`, 
		`${req.body.ship_date	     }`,  
		`${req.body.ship_street	     }`,  
		`${req.body.ship_city	     }`,  
		`${req.body.ship_st_number   }`,  
		`${req.body.ship_st_info     }`,  
		`${req.body.ship_tel1	     }`,  
		`${req.body.ship_tel2	     }` ,  		   
		`${req.params.order_no		}` 
	] ;

	conction2.query( sql_query1,sql_query2, (err, data, fields) => {
		if (!err)  {
			console.log('DB_Q_Byr UPDATED order no.: ' , `${req.params.order_no}`);
			console.log('DB_Q_Byr UPDATED order.payment_id: ' , `${req.params.payment_id}`);
			console.log('DB_Q_Byr UPDATED order.cart_no	: ' , `${req.params.cart_no}`);
			res.send({msg:'Updated', 'UPDATED order no.': `${req.params.order_no}`});		 
		} else console.log("DB_Q_Byr 'update order' error: " + err);
	});
};
// ======================================================= 
 
//7.1 GET ALL CITIES ORDER BY city_name:DESC
// cities_arr2  מערך של כל הישובים בארץ. פועל כראוי. מתעדכן ממאגר המידע- לא בשימוש במסגרת תרגיל זה
const get_cities  =  (req, res) => {

	let sql_query = `
		SELECT 
			city_name
		FROM 
			rehovot 
		GROUP BY city_name 
		ORDER BY city_name ASC 
		LIMIT 2000 `;
	
    conction2.query(sql_query, (err, data) => {
        if (!err){
			console.log('DB_Q_Byr ALL cities list retrieved!')
			console.log(data);
			
			res.json(data); // res.send(data);
		}
        else
            console.log("DB_Q_Byr ERROR in 'GET ALL cities': " + err); 
    });
};

//	7.2 GET ALL STREETS of city by city_name ORDER BY street_name:ASC
const st_of_city = (req, res) => {
	let sql_query1 = 'SELECT street_name FROM rehovot WHERE city_name = ? ORDER BY street_name ASC';
	let sql_query2 = [req.params.city_name];

    conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){	
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr NO streetss were found!')
				res.json(data);
			}
			else{
				console.log('DB_Q_Byr streets of ',req.params.city_name, ' retrieved!')
				res.json(data); // res.send(data);
		}
	}
        else 
			console.log("DB_Q_Byr ERROR in GET streetss of city : " + err); 
    });
};

//8.2 list dates with 3+ orders. (to block more shipments on these dates)
// app.get('/api/ship/count_dates', (req, res) => {
const many_shipments_dates = (req, res) => {
	
	let sql_query = `
		SELECT 
			ship_date, 
			COUNT(*) AS 'shippments_per_date'
		FROM
			orders
		GROUP BY ship_date
		HAVING COUNT(*) >= 3
		ORDER BY shippments_per_date DESC; `

    conction2.query(sql_query, (err, data) => {
        if (!err){	
			console.log('DB_Q_Byr Dates to block retrieved!',data)
			res.json(data); // res.send(data);
		}
        else 
			console.log("DB_Q_Byr ERROR: in COUNT dates : " + err); 
    });
};
 
module.exports = {app}
 
module.exports.user_details = user_details;

module.exports.get_all_prod_types = get_all_prod_types;

module.exports.get_all_products = get_all_products;
module.exports.get_product = get_product;
module.exports.products_by_type = products_by_type;

module.exports.new_cart = new_cart;
module.exports.del_cart = del_cart;
module.exports.cart_updated = cart_updated;
module.exports.last5open_carts = last5open_carts;
module.exports.last5submited_carts = last5submited_carts;


module.exports.cart_items_of_cart = cart_items_of_cart;
module.exports.del_cart_item = del_cart_item;
module.exports.new_cart_item = new_cart_item;
module.exports.update_cart_item = update_cart_item;

module.exports.last5orders = last5orders;
module.exports.new_order = new_order;
module.exports.update_order = update_order;
module.exports.many_shipments_dates = many_shipments_dates;


module.exports.get_cities = get_cities;
module.exports.st_of_city = st_of_city;

/*
//3.4 Get A PRODUCT by product_name
const get_product_by_name = (req,res) => { 

	let sql_query1 = `
	SELECT
		product_code,product_barcode,product_type_code,product_name,product_descrptn,product_img,product_unit_type,manf_code,currency,selling_list_price,selling_current_price
	FROM products 
	WHERE product_name = ?`;
	let sql_query2 = [req.params.product_code];
	
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('DB_Q_Byr Product NOT found!')
				res.json(data);
			} else{
				console.log('DB_Q_Byr procuct retrieved :',data)
				res.send(data);
			}
		}
		else 
			console.log("DB_Q_Byr ERROR in GET A PRODUCT: " + err); 
    });
};
*/

/*
//3.8A GET ALL PRODUCTS NAMES
app.get('/api/products/names1', (req, res) => {
	let sql_query = 'SELECT * FROM products';
    conction2.query(sql_query, (err, data) => {
        if (!err){
			console.log('DB_Q_Byr ALL products names retrieved!!!')
 
			let data_arr_of_product_name = [];
			for (i=0; i<data.length; i++) {
				data_arr_of_product_name[i]=data[i].product_name;
			}
			console.log(data_arr_of_product_name);
	
			res.json(data_arr_of_product_name); // work! output 1 name
		}
        else
			console.log("DB_Q_Byr ERROR in 'GET ALL products': " + err); 
    });
});
//3.8B GET ALL PRODUCTS NAMES
app.get('/api/products/names2', (req, res) => {
	let sql_query = 'SELECT product_name FROM products';
    conction2.query(sql_query, (err, data) => {
        if (!err){
			console.log('DB_Q_Byr product_names retrieved!')
 			res.json(data);  
		}
        else
			console.log("DB_Q_Byr ERROR in 'GET product_names': " + err); 
    });
});

//4.1 GET A cart BY cart_no 
app.get('/api/carts/get1/:cart_no', (req, res) => {
	let sql_query1 = 'SELECT * FROM carts WHERE cart_no = ?';
	let sql_query2 = [req.params.cart_no];
	
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('Byr_rout-  Cart NOT found!')
				res.json(data);
			} else{
				console.log('Byr_rout-  Cart retrieved :',data)
				res.send(data);
			}
		}
		else 
			console.log("Byr_rout-  ERROR in GET A CART: " + err); 
    });
});

//4.3 GET ALL CARTS OF USER ORDER BY cart_date:DESC (LIMIT)
app.get('/api/carts/by_user/:user_id', (req, res) => {
	let sql_query1 = 'SELECT * FROM carts WHERE user_id = ? ORDER BY cart_date DESC';
	let sql_query2 = [req.params.user_id];

    conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){	
			if (data.length < 1 ) { 
				console.log('Byr_rout-  NO carts were found!')
				res.json(data);
			}
			else{
				console.log('Byr_rout-  limit 5 Carts By user retrieved!',data)
				res.json(data); // res.send(data);
		}
	}
        else 
			console.log("Byr_rout-  5 Carts By user-Error: " + err); 
    });
});


//4.8 EXPORT A cart TO CSV FILE  
app.get('/api/carts/export1/:cart_no', (req, res) => {
	let sql_query1 = `
		SELECT * FROM carts 
		WHERE cart_no = ?
		INTO OUTFILE 'c:/dor20-backend/cart_out3.csv' 
		COLUMNS TERMINATED BY ','	
		LINES TERMINATED BY '\r\n';  `

	let sql_query2 = [req.params.cart_no];
	
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('Byr_rout-  Cart NOT found!')
				res.json(data);
			} else{
				console.log('Byr_rout-  Cart exported to CSV file :',data)
				res.send(data);
			}
		}
		else 
			console.log("Byr_rout-  ERROR in 'CART EXPORT': " + err); 
    });
});


//5.1 GET A cart_item  BY cart_item_no  
app.get('/api/cart_items/get1/:cart_item_no', (req, res) => {
	//console.log( 'GET A cart_item BY cart_item_no started' );
	//console.log( req.params.cart_item_no );
	let sql_query1 = 'SELECT * FROM cart_items WHERE cart_item_no = ?';
	let sql_query2 = [req.params.cart_item_no];
	conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){
			if (data.length < 1 ) { 
				console.log('Byr_rout-  cart_item NOT found!')
				res.json(data);
			} else{
				console.log('Byr_rout-  Cart item retrieved :',data)
				res.send(data);
			}
		}
		else 
			console.log("Byr_rout-  ERROR in GET A cart_item: " + err); 
    });
});


//6.1 GET n ORDERS FILTERED BY user_id ORDER BY order_date:DESC 
app.get('/api/orders/:limit_n/by_user/:user_id', (req, res) => {
	let sql_query1 = 'SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC LIMIT  ? ';
	let sql_query2 = [req.params.user_id, parseInt(req.params.limit_n)];

    conction2.query(sql_query1,sql_query2, (err, data) => {
        if (!err){	
			if (data.length < 1 ) { 
				console.log('Byr_rout-  NO orders were found!')
				res.json(data);
			}
			else{
				console.log('Byr_rout-  Orders By user retrieved!')
				res.json(data); // res.send(data);
		}
	}
        else 
			console.log("Byr_rout-  ERROR in GET orders of a user : " + err); 
    });
});

*/ 
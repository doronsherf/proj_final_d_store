// TABLE1: USERS			
let tbl1_data = ` 
		INSERT INTO users (user_id, user_pr_name, user_fam_name, user_email, user_tel1, user_tel2, user_street, user_city, user_st_number, user_st_info, user_type, user_pwd, user_last_login) 
		VALUES
		(123123123, 'בבב', 'אאא', 'zxc@fgh.uy', '055-1234567890', '050-9876543210', 'יער חדרה                 ', 'חדרה', '44', 'קומה 88', 88, '8a$10$Ck/drQ6e1bN9MHhYG9OIXehkbSSoc92DFVN0VuBbFsUKHlw0SbXRW', '0000-00-00 00:00:00');



		INSERT INTO users (user_id, user_pr_name, user_fam_name, user_email, user_tel1, user_tel2, user_street, user_city, user_st_number, user_st_info, user_type, user_pwd, user_last_login) 
		VALUES
			(11000011, 'שימי', 'לוין', 'zxc@fgh.uy', '055-3659147', '050-3213210', 'יער חדרה                 ', 'חדרה', '65', 'קומה 3', 3, '$2a$10$Ck/drQ6e1bN9MHhYG9OIXehkbSSoc92DFVN0VuBbFsUKHlw0SbXRW', '0000-00-00 00:00:00'),
			(11111111, 'מלך', 'מלאכי האדמין הבכיר', 'dgf@kh.co.il', '050-987654321', '02-1234567', 'אבא חושי                 ', 'חיפה', '11', '', 1, '$2a$10$0r2VP.6Pfa3adZjSKnbsO.jJuqFjzQOZPtL44bzONmTAyWgNtYFy6', '2020-02-19 07:36:12'),
			(12000012, 'אשר11', 'חלב', 'aaa@eee', '123456789', '', 'כרמל צפוני               ', 'חיפה', '56', '', 3, '$2a$10$hK02xGhBbEPfaeWsMKzZReugXPj18y/.00uVsKS5n7x62t2FAXNOS', '0000-00-00 00:00:00'),
			(13000013, 'דוד', 'שרף', 'ddddo@gmail.com', '0501122333', '', 'בני יעקב                 ', 'בני ברק', '63', 'על יד מכולת פנחסי', 3, '$2a$10$ZE75nyDpft.zOUEVclPDtOhFZZ8T2fQ0UQ.FVo28gDNpCLjCiTvRG', '2020-03-23 07:05:49'),
			(22222222, 'סגני', 'הסגן אדמין 2', 'ss@dd.yut', '02-12345678', '050-88800088', 'העיר העתיקה              ', 'ירושלים', '11', '', 2, '$2a$10$tdDX/44rHONcnn.UW8j4oeGK7DBtEcVS3WkXrfalfBZYzvaTlp.yq', '2020-02-19 06:46:15'),
			(33333333, 'לקוח', 'ותיק', 'lll@ggg.com', '321321321', '', 'ראשון עלית               ', 'ראשון לציון', '15', 'עדכן', 3, '$2a$10$SJpTum7/aozGs.6qP/HwA.jM6nbFkxW0sDpGxScPnhDrB4QQVk1Oa', '0000-00-00 00:00:00'),
			(44444444, 'אתי', 'צדיק', 'xv@ytre.uy', '052-65899994', '56445665', 'נחל עמוד                 ', 'צפת', '16', 'להתקשר שישלחו את המעלית הפרטית', 3, '$2a$10$kPdizJYhiZBiSDBWalmfduCM2q.4Ryu.fGXauBlvhRKdDW1dx7ygy', '0000-00-00 00:00:00'),
			(55555555, 'ערן', 'ירקוני', 'df@dgfd', '055-123123123', '', 'נמר                      ', 'אשקלון', '22', 'פעמון שחור', 3, '$2a$10$uZ.f046HsqNHuqf.6kmDweLb/VqsPglftq0b0gMQ8YJ8BY9MMR1Cq', '0000-00-00 00:00:00'),
			(66666666, 'אדם', 'הלוי', 'sds@gmail.com', '055-98989898', '', 'גיסין אבשלום             ', 'פתח תקווה', '62', 'עבודה: מחסן', 3, '$2a$10$XGlNoHO1uQO3pcvV0KyH5eMD2wIQvqsfdktr2SAEhxWxWqg7mkX.C', '0000-00-00 00:00:00'),
			(77777777, 'קונה', 'הרבה', 'wreq@gfco.za', '03-465465255', '', 'האצ\"ל                    ', 'ירושלים', '12', 'דירה 14 קומה 6', 3, '$2a$10$fKl/PMJYCsR.LN1T5BcnDO8Ehha/VCKHfPn8yV.3LNvLzFmqb57ri', '0000-00-00 00:00:00'),
			(88888888, 'דנה', 'לוי', 'fds@jhg', '04-65988', '', 'הנגב                     ', 'באר שבע', '41', '', 3, '$2a$10$CKPOdyZYl/3jknL0L7ZpLOJd3RcnVJXOGMi6JrgIgiGcqq0WbzX3C', '0000-00-00 00:00:00'),
			(99999999, 'דליה עודכן', 'כוכבי עודכן', 'gfd@mail.comUPDR', '03-12365478', '', 'בני יעקב                 ', 'בני ברק', '11', '', 3, '$2a$10$kfxQjRPPaItXDBb6iSGlJ.PpSZ8NwADAbItZbNxGbcaZ.fhebvIM6', '0000-00-00 00:00:00');`

			
// TABLE2: PRODUCTS TYPES
let tbl2_data = ` 
INSERT INTO products_types (product_type_code, product_type_name) 
VALUES
	(1, 'Rx_Pharm'),
	(2, 'OTC'),
	(3, 'Toiletries'),
	(4, 'Perfumes'),
	(5, 'Cleaners'),
	(6, 'Diet & Nutrition'),
	(7, 'Babys');`


// TABLE3: PRODUCTS
let tbl3_data = ` 
	INSERT INTO products (product_code, product_barcode, product_type_code, product_name, product_descrptn, product_img, product_unit_type, manf_code, supl_code, currency, supl_list_price, supl_last_price, selling_list_price, selling_current_price) 
	VALUES
		(888, 888888, 2, 'prod 888', 'LONG PRODUCT DESCRIPTION !! LONG PRODUCT DESCRIPTION !! LONG PRODUCT DESCRIPTION !! LONG PRODUCT DES', '22.jpg', 'pack', 88, 99, 'NIS', 100, 90, 150, 111),
		(1001, 45466666, 1, 'pro ALA ', 'description of 1001', '1.jpg', 'pack', 68, 68, 'NIS', 98, 94, 140, 133),
		(1002, 10021002, 1, 'pro A   ', 'description of 1002', '2.jpg', 'pack', 68, 68, 'NIS', 80, 80, 150, 105),
		(1003, 10030852, 1, 'ALMO T-30', 'blood pressure home monitoring devices', '3.jpg', 'box', 55, 55, 'NIS', 160, 150, 248, 199),
		(1004, 10049882, 1, 'prod CCC', 'description of 1004', '4.jpg', 'pack', 44, 44, 'NIS', 38, 32, 55, 45),
		(1006, 10063459, 1, 'pro  hhh', 'description of 1006', '6.jpg', 'pack', 99, 99, 'NIS', 40, 35, 66, 48),
		(1007, 10073459, 1, 'pro  ttr', 'description of 1007', '7.jpg', 'pack', 99, 99, 'NIS', 20, 15, 35, 26),
		(1008, 10083459, 1, 'pro  ttr', 'description of 1008', '8.jpg', 'pack', 99, 99, 'NIS', 100, 77, 150, 106),
		(1009, 10093459, 1, 'Cialis 5mg', 'description of Cialis 5mg 1579', '9.jpg', 'pack', 99, 99, 'NIS', 4, 4, 7, 5),
		(1010, 10103459, 1, 'VIAGRA 100MG', 'VIAGRA 100 MG FULL DESCRIPTION. ', '28.jpg', 'pack', 99, 99, 'NIS', 101, 75, 122, 109),
		(1011, 10113459, 1, 'pro  zxc', 'description of 1011', '11.jpg', 'pack', 99, 99, 'NIS', 80, 71, 151, 100),
		(1012, 56674349, 1, 'pro  saq', 'description of 1012', '12.jpg', 'pack', 99, 99, 'NIS', 40, 34, 66, 51),
		(1013, 13883459, 1, 'pro  edf', 'description of 1013', '13.jpg', 'pack', 99, 99, 'NIS', 43, 28, 65, 50),
		(1014, 1388366004, 1, 'pro  edf', 'description of 1014', '14.jpg', 'pack', 99, 99, 'NIS', 80, 78, 120, 101),
		(1015, 15553459, 1, 'pro  LKK', 'description of 1015', '15.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1016, 16663459, 1, 'pro  E23', 'description of 1016', '16.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1017, 17773459, 1, 'pro  210', 'description of 1017', '17.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1018, 18883459, 1, 'pro  102', 'description of 1018', '18.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1019, 19993459, 1, 'pro  KLK', 'description of 1019', '19.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1021, 45553459, 1, 'pro  VBC', 'description of 1021', '21.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1022, 10223459, 1, 'pro  SAS', 'description of 1022', '22.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1023, 20133459, 1, 'pro  WWE', 'description of 1023', '23.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1024, 24443459, 1, 'pro  EEW', 'description of 1024', '24.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1026, 10263459, 1, 'pro  QRR', 'description of 1026', '26.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1027, 10278459, 1, 'pro  OLP', 'description of 1027', '27.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1028, 2107483007, 1, 'regain for man', 'description of 1028', '34.jpg', 'pack', 23, 98, 'NIS', 444, 444, 666, 555),
		(1029, 52113459, 1, 'pro  OP0', 'description of 1029', '29.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1030, 30213459, 1, 'pro  P09', 'description of 1030', '30.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1031, 56777689, 2, 'pro FFF', 'description 1031!!!', '31.jpg', 'pack', 88, 15, 'NIS', 13, 14, 22, 19),
		(1201, 45101626, 2, 'pro oct8', 'description of 1101', 'otc1.jpg', 'pack', 68, 68, 'NIS', 98, 94, 140, 133),
		(1202, 10101022, 2, 'pro oct7', 'description of 1102', 'otc2.jpg', 'pack', 68, 68, 'NIS', 80, 80, 150, 105),
		(1203, 12031822, 2, 'pro oct6', 'description of 1103', 'otc3.jpg', 'pack', 55, 55, 'NIS', 60, 50, 70, 65),
		(1204, 10101822, 2, 'prodoct5', 'description of 1104', 'otc4.jpg', 'pack', 44, 44, 'NIS', 38, 32, 55, 45),
		(1205, 10101425, 2, 'prodoct4', 'description of 1105', 'otc5.jpg', 'pack', 88, 60, 'NIS', 22, 22, 35, 25),
		(1206, 10171429, 2, 'pro oct3', 'description of 1106', 'otc6.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1207, 10161429, 2, 'pro octx', 'description of 1107', 'otc7.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1208, 10118429, 2, 'pro octz', 'description of 1108', 'otc8.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1209, 10154429, 2, 'pro octb', 'description of 1109', 'otc9.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1210, 10101429, 2, 'pro octm', 'description of 1110', 'otc10.jpg', 'pack', 99, 99, 'NIS', 400, 350, 650, 500),
		(1301, 43001666, 3, 'pro t8', 'description of 1101', 'toil1.jpg', 'pack', 68, 68, 'NIS', 198, 194, 240, 233),
		(1302, 13001002, 3, 'pro t7  ', 'description of 1102', 'toil2.jpg', 'pack', 68, 68, 'NIS', 280, 280, 250, 205),
		(1303, 13001852, 3, 'pro t6  ', 'description of 1103', 'toil3.jpg', 'pack', 55, 55, 'NIS', 560, 650, 670, 765),
		(1304, 13001802, 3, 'pro t5  ', 'description of 1104', 'toil4.jpg', 'pack', 44, 44, 'NIS', 438, 432, 455, 445),
		(1305, 13001425, 3, 'pro t4  ', 'description of 1105', 'toil5.jpg', 'pack', 88, 60, 'NIS', 2, 2, 5, 6),
		(1401, 14011425, 4, 'pro tl1 ', 'description of 1401', 'frag5.jpg', 'pack', 188, 160, 'NIS', 202, 222, 215, 206),
		(1402, 14001002, 4, 'pro tl7 ', 'description of 1402', 'frag2.jpg', 'pack', 168, 168, 'NIS', 280, 280, 250, 205),
		(1403, 14001852, 4, 'pro tl6 ', 'description of 1403', 'frag3.jpg', 'pack', 355, 325, 'NIS', 560, 650, 770, 765),
		(1404, 14001802, 4, 'pro tl5 ', 'description of 1404', 'frag4.jpg', 'pack', 446, 484, 'NIS', 438, 432, 455, 445),
		(1501, 15011425, 5, 'pro tl4 ', 'description of 1505', 'cle1.jpg', 'pack', 8, 6, 'NIS', 2, 2, 4, 5),
		(1502, 15021665, 5, 'pro 664 ', 'description of 1506', 'cle2.jpg', 'pack', 36, 36, 'NIS', 42, 42, 34, 35),
		(1601, 16011425, 6, 'pro nu1 ', 'description of 1601', 'nut1.jpg', 'pack', 188, 160, 'NIS', 202, 222, 315, 206),
		(1602, 16001002, 6, 'pro nu7 ', 'description of 1602', 'nut2.jpg', 'pack', 168, 168, 'NIS', 280, 280, 250, 205),
		(1603, 16001852, 6, 'pro nu6 ', 'description of 1603', 'nut3.jpg', 'pack', 355, 325, 'NIS', 560, 650, 770, 765),
		(1701, 17011425, 7, 'pro baby1', 'description of 1701', 'bab1.jpg', 'pack', 200, 220, 'NIS', 240, 260, 380, 300),
		(1702, 17001002, 7, 'pro baby2', 'description of 1702', 'bab2.jpg', 'pack', 300, 320, 'NIS', 280, 280, 250, 220),
		(1703, 17001852, 7, 'pro baby3', 'description of 1703', 'bab3.jpg', 'pack', 350, 350, 'NIS', 600, 600, 790, 765),
		(3506, 466532133, 6, 'Apolo 125gr', 'null', 'bab3', 'sad', 58, 32, 'NIS', 0, 0, 0, 20),
		(166666, 4320089, 1, 'prodoct PPMO-36', 'description of 1104', '31.jpg', 'pack', 36, 36, 'NIS', 36, 36, 36, 36),
		(16666601, 432008971, 1, 'prodoct PPMO-23', 'description of 1104', 'otc4.jpg', 'pack', 44, 44, 'NIS', 38, 32, 55, 45);`


// TABLE4: CARTS 
let tbl4_data = ` 
	INSERT INTO carts (cart_no, user_id, cart_date, cart_submited) 
	VALUES
		(300, 77777777, '2020-03-15 00:00:00', 0),
		(301, 77777777, '2020-03-15 00:00:00', 0),
		(303, 33333333, '2020-03-15 00:00:00', 0),
		(304, 44444444, '2020-03-15 00:00:00', 0),
		(306, 44444444, '2020-03-15 00:00:00', 0),
		(307, 77777777, '2020-03-15 00:00:00', 0),
		(308, 55555555, '2020-03-15 00:00:00', 0),
		(309, 44444444, '2020-03-15 00:00:00', 0),
		(310, 33333333, '2020-03-16 00:00:00', 0),
		(312, 44444444, '2020-03-16 00:00:00', 0),
		(313, 77777777, '2020-03-17 00:00:00', 0),
		(314, 77777777, '2020-03-17 00:00:00', 0),
		(315, 44444444, '2020-03-18 00:00:00', 0),
		(316, 11000011, '2020-03-18 00:00:00', 0),
		(317, 44444444, '2020-03-19 00:00:00', 0),
		(318, 11000011, '2020-03-19 00:00:00', 0),
		(319, 11000011, '2020-03-19 00:00:00', 0),
		(320, 11000011, '2020-03-19 00:00:00', 0),
		(321, 12000012, '2020-03-20 00:00:00', 0),
		(322, 11000011, '2020-03-21 00:00:00', 0),
		(323, 11000011, '2020-03-21 00:00:00', 0),
		(324, 11000011, '2020-03-21 00:00:00', 0),
		(325, 11000011, '2020-03-21 00:00:00', 0),
		(326, 33333333, '2020-01-22 00:00:00', 0),
		(327, 33333333, '2020-03-22 00:00:00', 0),
		(328, 33333333, '2020-03-23 00:00:00', 0),
		(329, 33333333, '2020-03-23 00:00:00', 1),
		(330, 33333333, '2020-03-23 00:00:00', 1),
		(331, 33333333, '2020-03-23 00:00:00', 0),
		(332, 33333333, '2020-03-23 03:14:37', 1),
		(333, 33333333, '2020-03-23 03:31:02', 1),
		(334, 33333333, '2020-03-23 03:36:52', 0),
		(335, 33333333, '2020-03-23 03:38:16', 0),
		(336, 33333333, '2020-03-23 03:40:54', 0),
		(337, 33333333, '2020-03-23 03:43:36', 0),
		(338, 33333333, '2020-03-23 03:46:59', 0),
		(339, 33333333, '2020-03-23 03:52:37', 0),
		(340, 13000013, '2020-03-23 04:33:05', 0),
		(341, 44444444, '2020-03-23 06:17:23', 1),
		(342, 44444444, '2020-03-23 06:23:20', 1),
		(343, 44444444, '2020-03-23 06:30:37', 0),
		(344, 77777777, '2020-03-23 06:33:50', 1),
		(345, 77777777, '2020-03-23 08:42:39', 1),
		(346, 77777777, '2020-03-23 10:07:21', 1),
		(347, 77777777, '2020-03-23 12:22:17', 1),
		(348, 77777777, '2020-03-23 13:48:24', 1),
		(349, 55555555, '2020-03-24 08:08:34', 0); `

//  TABLE5: CART ITEMS
let tbl5_data = ` 
	INSERT INTO cart_items (cart_item_no, cart_no, product_code, price, qty, total_row) VALUES
		(413, 300, 1014, '120.00', 2, '240.00'),
		(414, 300, 1010, '650.00', 1, '650.00'),
		(415, 300, 1702, '220.00', 2, '440.00'),
		(416, 300, 1601, '206.00', 4, '824.00'),
		(419, 300, 1014, '101.00', 4, '404.00'),
		(420, 301, 1014, '101.00', 4, '404.00'),
		(422, 300, 1001, '133.00', 2, '266.00'),
		(425, 300, 1003, '65.00', 1, '65.00'),
		(427, 301, 1003, '65.00', 1, '65.00'),
		(433, 303, 888, '150.00', 3, '450.00'),
		(434, 303, 1001, '140.00', 5, '700.00'),
		(435, 303, 1007, '500.00', 1, '500.00'),
		(436, 304, 1006, '650.00', 1, '650.00'),
		(437, 304, 1013, '650.00', 2, '1300.00'),
		(438, 304, 1002, '150.00', 3, '450.00'),
		(443, 306, 1010, '500.00', 2, '1000.00'),
		(444, 306, 1012, '500.00', 1, '500.00'),
		(445, 306, 1026, '500.00', 3, '1500.00'),
		(450, 307, 1014, '120.00', 2, '240.00'),
		(451, 307, 1010, '650.00', 1, '650.00'),
		(452, 307, 1006, '500.00', 1, '500.00'),
		(453, 307, 1007, '500.00', 1, '500.00'),
		(454, 308, 1026, '650.00', 2, '1300.00'),
		(456, 308, 1004, '55.00', 1, '55.00'),
		(457, 308, 1007, '500.00', 2, '1000.00'),
		(458, 309, 1006, '650.00', 1, '650.00'),
		(459, 309, 1013, '650.00', 1, '650.00'),
		(460, 309, 1002, '150.00', 3, '450.00'),
		(461, 310, 888, '150.00', 3, '450.00'),
		(462, 310, 1001, '140.00', 4, '560.00'),
		(463, 310, 1007, '650.00', 1, '650.00'),
		(471, 312, 1401, '206.00', 2, '412.00'),
		(472, 312, 1502, '35.00', 3, '105.00'),
		(473, 312, 1203, '65.00', 3, '195.00'),
		(477, 313, 1014, '120.00', 1, '120.00'),
		(479, 313, 1014, '101.00', 2, '202.00'),
		(480, 313, 1031, '19.00', 4, '76.00'),
		(481, 314, 1014, '120.00', 2, '240.00'),
		(482, 314, 1004, '45.00', 1, '45.00'),
		(483, 314, 1031, '19.00', 3, '57.00'),
		(485, 315, 1502, '34.00', 2, '68.00'),
		(486, 315, 1203, '70.00', 3, '210.00'),
		(487, 316, 888, '120.00', 1, '120.00'),
		(488, 316, 1004, '45.00', 2, '90.00'),
		(489, 316, 1014, '101.00', 3, '303.00'),
		(490, 317, 1502, '34.00', 1, '34.00'),
		(492, 317, 1003, '65.00', 2, '130.00'),
		(493, 317, 1001, '133.00', 1, '133.00'),
		(494, 317, 1702, '220.00', 1, '220.00'),
		(495, 318, 888, '150.00', 1, '150.00'),
		(496, 318, 1004, '55.00', 3, '165.00'),
		(497, 318, 1014, '120.00', 3, '360.00'),
		(498, 319, 888, '120.00', 1, '120.00'),
		(500, 319, 1001, '133.00', 2, '266.00'),
		(501, 320, 1001, '133.00', 1, '133.00'),
		(502, 319, 1004, '45.00', 1, '45.00'),
		(503, 320, 1004, '45.00', 3, '135.00'),
		(504, 319, 1002, '105.00', 2, '210.00'),
		(505, 320, 1002, '105.00', 2, '210.00'),
		(506, 319, 1402, '205.00', 1, '205.00'),
		(507, 320, 1402, '205.00', 1, '205.00'),
		(508, 320, 1402, '205.00', 1, '205.00'),
		(509, 319, 1401, '206.00', 1, '206.00'),
		(510, 320, 1401, '206.00', 1, '206.00'),
		(511, 320, 1401, '206.00', 1, '206.00'),
		(512, 319, 1304, '445.00', 2, '890.00'),
		(513, 320, 1304, '445.00', 2, '890.00'),
		(514, 320, 1304, '445.00', 2, '890.00'),
		(515, 319, 1302, '205.00', 1, '205.00'),
		(516, 320, 1302, '205.00', 1, '205.00'),
		(517, 320, 1302, '205.00', 1, '205.00'),
		(518, 319, 1031, '19.00', 2, '38.00'),
		(519, 320, 1031, '19.00', 2, '38.00'),
		(520, 320, 1031, '19.00', 2, '38.00'),
		(521, 319, 1201, '133.00', 1, '133.00'),
		(522, 320, 1201, '133.00', 1, '133.00'),
		(523, 320, 1201, '133.00', 1, '133.00'),
		(524, 319, 1026, '500.00', 1, '500.00'),
		(525, 320, 1026, '500.00', 1, '500.00'),
		(526, 320, 1026, '500.00', 1, '500.00'),
		(527, 319, 1017, '500.00', 1, '500.00'),
		(528, 320, 1017, '500.00', 1, '500.00'),
		(529, 320, 1017, '500.00', 4, '2000.00'),
		(530, 319, 1202, '105.00', 2, '210.00'),
		(531, 320, 1202, '105.00', 2, '210.00'),
		(532, 320, 1202, '105.00', 2, '210.00'),
		(533, 320, 1023, '500.00', 2, '1000.00'),
		(534, 320, 1204, '45.00', 3, '135.00'),
		(535, 320, 1204, '45.00', 3, '135.00'),
		(536, 320, 1002, '105.00', 1, '105.00'),
		(537, 320, 1003, '65.00', 1, '65.00'),
		(538, 320, 1007, '500.00', 1, '500.00'),
		(539, 320, 1009, '500.00', 1, '500.00'),
		(540, 320, 1011, '500.00', 1, '500.00'),
		(541, 320, 1013, '500.00', 1, '500.00'),
		(542, 320, 1015, '500.00', 1, '500.00'),
		(543, 320, 1017, '500.00', 1, '500.00'),
		(544, 320, 1018, '500.00', 1, '500.00'),
		(545, 320, 1022, '500.00', 1, '500.00'),
		(546, 320, 1024, '500.00', 1, '500.00'),
		(547, 320, 1026, '500.00', 1, '500.00'),
		(548, 320, 1027, '500.00', 1, '500.00'),
		(549, 320, 1029, '500.00', 1, '500.00'),
		(550, 320, 1031, '19.00', 1, '19.00'),
		(551, 320, 1201, '133.00', 1, '133.00'),
		(552, 320, 1203, '65.00', 1, '65.00'),
		(553, 320, 1205, '25.00', 1, '25.00'),
		(554, 321, 888, '120.00', 2, '240.00'),
		(555, 321, 1001, '133.00', 3, '399.00'),
		(556, 321, 1002, '105.00', 2, '210.00'),
		(557, 322, 888, '150.00', 2, '300.00'),
		(558, 322, 1004, '55.00', 3, '165.00'),
		(559, 322, 1014, '120.00', 2, '240.00'),
		(560, 323, 888, '150.00', 2, '300.00'),
		(561, 323, 1004, '55.00', 3, '165.00'),
		(562, 323, 1014, '120.00', 2, '240.00'),
		(563, 324, 888, '150.00', 2, '300.00'),
		(564, 324, 1004, '55.00', 3, '165.00'),
		(565, 324, 1014, '120.00', 2, '240.00'),
		(566, 325, 888, '150.00', 2, '300.00'),
		(567, 325, 1004, '55.00', 3, '165.00'),
		(568, 325, 1014, '120.00', 2, '240.00'),
		(569, 325, 1502, '35.00', 4, '140.00'),
		(570, 326, 888, '150.00', 3, '450.00'),
		(571, 326, 1001, '140.00', 4, '560.00'),
		(572, 326, 1007, '650.00', 2, '1300.00'),
		(573, 327, 1001, '140.00', 12, '1680.00'),
		(574, 327, 1003, '70.00', 89, '6230.00'),
		(575, 328, 1001, '140.00', 6, '840.00'),
		(576, 328, 1003, '70.00', 88, '6160.00'),
		(577, 329, 1001, '140.00', 10, '1400.00'),
		(578, 329, 1003, '70.00', 30, '2100.00'),
		(579, 330, 1001, '140.00', 21, '2940.00'),
		(580, 330, 1003, '70.00', 88, '6160.00'),
		(581, 329, 1006, '500.00', 2, '1000.00'),
		(588, 330, 1006, '500.00', 2, '1000.00'),
		(589, 330, 1006, '500.00', 2, '1000.00'),
		(593, 329, 888, '120.00', 3, '360.00'),
		(597, 330, 888, '120.00', 3, '360.00'),
		(598, 330, 888, '120.00', 3, '360.00'),
		(599, 331, 888, '120.00', 3, '360.00'),
		(601, 329, 1207, '500.00', 2, '1000.00'),
		(607, 330, 1207, '500.00', 2, '1000.00'),
		(608, 330, 1207, '500.00', 2, '1000.00'),
		(609, 331, 1207, '500.00', 2, '1000.00'),
		(610, 329, 1305, '6.00', 4, '24.00'),
		(617, 330, 1305, '6.00', 4, '24.00'),
		(618, 330, 1305, '6.00', 4, '24.00'),
		(619, 331, 1305, '6.00', 4, '24.00'),
		(624, 329, 1601, '206.00', 1, '206.00'),
		(627, 330, 1601, '206.00', 1, '206.00'),
		(628, 330, 1601, '206.00', 1, '206.00'),
		(629, 331, 1601, '206.00', 1, '206.00'),
		(630, 332, 1001, '140.00', 1, '140.00'),
		(631, 332, 1003, '70.00', 27, '1890.00'),
		(632, 332, 1006, '650.00', 2, '1300.00'),
		(633, 332, 888, '150.00', 3, '450.00'),
		(634, 332, 1207, '650.00', 2, '1300.00'),
		(635, 332, 1305, '5.00', 6, '30.00'),
		(636, 332, 1601, '215.00', 2, '430.00'),
		(637, 332, 1001, '133.00', 1, '133.00'),
		(638, 333, 1001, '133.00', 1, '133.00'),
		(639, 332, 1003, '65.00', 1, '65.00'),
		(640, 333, 1003, '65.00', 1, '65.00'),
		(641, 334, 1001, '140.00', 3, '420.00'),
		(642, 334, 1003, '70.00', 58, '4060.00'),
		(643, 335, 1001, '140.00', 7, '980.00'),
		(644, 335, 1003, '70.00', 52, '3640.00'),
		(645, 332, 888, '120.00', 1, '120.00'),
		(646, 333, 888, '120.00', 1, '120.00'),
		(647, 334, 888, '120.00', 1, '120.00'),
		(648, 335, 888, '120.00', 1, '120.00'),
		(649, 336, 1001, '140.00', 8, '1120.00'),
		(650, 336, 1003, '70.00', 52, '3640.00'),
		(651, 336, 888, '120.00', 2, '240.00'),
		(652, 337, 1001, '140.00', 4, '560.00'),
		(653, 337, 1003, '70.00', 3, '210.00'),
		(654, 337, 888, '150.00', 1, '150.00'),
		(657, 338, 888, '150.00', 7, '1050.00'),
		(658, 338, 1017, '500.00', 10, '5000.00'),
		(659, 338, 1029, '500.00', 10, '5000.00'),
		(660, 338, 1204, '45.00', 21, '945.00'),
		(661, 339, 888, '150.00', 6, '900.00'),
		(662, 339, 1017, '650.00', 10, '6500.00'),
		(663, 339, 1029, '650.00', 10, '6500.00'),
		(664, 339, 1204, '55.00', 20, '1100.00'),
		(665, 340, 1001, '133.00', 1, '133.00'),
		(666, 340, 888, '120.00', 3, '360.00'),
		(667, 341, 1502, '34.00', 1, '34.00'),
		(668, 341, 1003, '70.00', 4, '280.00'),
		(669, 341, 1001, '140.00', 3, '420.00'),
		(670, 341, 1702, '250.00', 1, '250.00'),
		(671, 341, 888, '120.00', 2, '240.00'),
		(673, 341, 1006, '500.00', 1, '500.00'),
		(675, 341, 1401, '206.00', 1, '206.00'),
		(677, 341, 1602, '205.00', 2, '410.00'),
		(679, 341, 1701, '300.00', 1, '300.00'),
		(681, 341, 1031, '19.00', 3, '57.00'),
		(683, 341, 1001, '133.00', 1, '133.00'),
		(684, 342, 1001, '133.00', 1, '133.00'),
		(685, 343, 1001, '133.00', 1, '133.00'),
		(686, 344, 1014, '120.00', 1, '120.00'),
		(687, 344, 1007, '500.00', 1, '500.00'),
		(688, 344, 1202, '105.00', 2, '210.00'),
		(689, 345, 1014, '120.00', 1, '120.00'),
		(690, 345, 1014, '120.00', 2, '240.00'),
		(691, 345, 1031, '22.00', 4, '88.00'),
		(692, 345, 1017, '500.00', 2, '1000.00'),
		(693, 345, 1501, '5.00', 5, '25.00'),
		(694, 346, 1014, '120.00', 1, '120.00'),
		(696, 346, 1031, '22.00', 4, '88.00'),
		(697, 346, 1017, '650.00', 1, '650.00'),
		(698, 346, 1501, '4.00', 5, '20.00'),
		(699, 347, 1014, '120.00', 1, '120.00'),
		(700, 347, 1031, '22.00', 4, '88.00'),
		(701, 347, 1017, '650.00', 1, '650.00'),
		(702, 347, 1501, '4.00', 4, '16.00'),
		(703, 347, 1013, '50.00', 1, '50.00'),
		(704, 348, 1014, '120.00', 1, '120.00'),
		(705, 348, 1031, '22.00', 4, '88.00'),
		(706, 348, 1017, '650.00', 1, '650.00'),
		(707, 348, 1501, '4.00', 4, '16.00'),
		(708, 348, 1013, '65.00', 1, '65.00'),
		(709, 348, 1011, '115.00', 1, '115.00'),
		(710, 349, 888, '120.00', 1, '120.00'),
		(711, 349, 1001, '133.00', 1, '133.00');`

//TABLE6: orders  
let tbl6_data = ` 
	INSERT INTO orders (order_no, user_id, cart_no, order_total, order_submited, order_date, payment_id, ship_date, ship_street, ship_city, ship_st_number, ship_st_info, ship_tel1, ship_tel2) VALUES
		(300, 12000012, 321, '849.00', 1, '2020-03-20 00:00:00', '05E20715K60302511', '2020-03-23 00:00:00', 'כרמל צפוני               ', 'חיפה', '21', '', '123456789', ''),
		(301, 12000012, 321, '849.00', 1, '2020-03-20 00:00:00', '4YB65350XM464644K', '2020-03-20 00:00:00', 'כרמל צפוני               ', 'חיפה', '56', '', '123456789', ''),
		(302, 11000011, 320, '12412.00', 1, '2020-03-20 00:00:00', '1MC36573K43094949', '2020-03-20 00:00:00', 'יער חדרה                 ', 'חדרה', '65', 'קומה 3', '055-3659147', '050-3213210'),
		(303, 11000011, 325, '705.00', 0, '2020-03-21 00:00:00', 'undefined', '2020-03-22 00:00:00', 'יער חדרה                 ', 'חדרה', 'undefined', 'קומה 3', '055-3659147', '050-3213210'),
		(304, 11000011, 325, '705.00', 0, '2020-03-21 00:00:00', 'undefined', '2020-03-24 00:00:00', 'יער חדרה                 ', 'חדרה', 'undefined', 'קומה 3', '055-3659147', '050-3213210'),
		(305, 11000011, 325, '845.00', 1, '2020-03-22 00:00:00', '0TS30398J80566415', '2020-03-24 00:00:00', 'יער חדרה                 ', 'חדרה', '65', 'קומה 3', '055-3659147', '050-3213210'),
		(306, 33333333, 326, '2310.00', 1, '2020-03-22 00:00:00', '5462159597223553J', '2020-03-24 00:00:00', 'ראשון עלית               ', 'ראשון לציון', '15', 'עדכן', '321321321', '123123123'),
		(308, 33333333, 327, '7770.00', 0, '2020-03-22 00:00:00', 'undefined', '2020-03-30 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'אם השער סגור להכנס מימין', '321321321', ''),
		(309, 33333333, 327, '7910.00', 1, '2020-03-23 00:00:00', '6F8460254C759190U', '2020-03-30 00:00:00', 'ראשון עלית               ', 'ראשון לציון', '15', 'עדכן', '321321321', ''),
		(310, 33333333, 328, '7000.00', 1, '2020-03-23 00:00:00', '11F721536F599494L', '2020-03-25 00:00:00', 'ראשון עלית               ', 'ראשון לציון', '15', 'עדכן', '321321321', ''),
		(311, 33333333, 329, '6020.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-24 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(312, 33333333, 329, '6300.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-30 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(313, 33333333, 329, '6300.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-30 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(314, 33333333, 329, '6510.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-24 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(315, 33333333, 329, '6510.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-31 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(316, 33333333, 329, '6720.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-31 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(317, 33333333, 329, '4900.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-30 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(318, 33333333, 329, '4900.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-04-14 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(319, 33333333, 329, '4200.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-24 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(320, 33333333, 329, '3990.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-24 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(321, 33333333, 329, '3990.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-04-01 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(322, 33333333, 329, '3500.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-04-02 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(323, 33333333, 330, '10100.00', 0, '2020-03-23 00:00:00', 'undefined', '2020-03-24 00:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(324, 33333333, 332, '4000.00', 0, '2020-03-23 03:18:40', 'undefined', '2020-03-31 10:00:00', 'ראשון עלית               ', 'ראשון לציון', 'undefined', 'עדכן', '321321321', ''),
		(325, 33333333, 333, '198.00', 1, '2020-03-23 03:32:33', '23L11160P7758373U', '2020-03-30 13:00:00', 'ראשון עלית               ', 'ראשון לציון', '15', 'עדכן', '321321321', ''),
		(326, 44444444, 341, '984.00', 1, '2020-03-23 06:19:34', '95G945017B861390A', '2020-03-24 14:00:00', 'נחל עמוד                 ', 'צפת', '34', ' להתקשר שישלחו את המעלית הפרטית', '052-65899994', '56445665'),
		(327, 44444444, 342, '1713.00', 1, '2020-03-23 06:25:17', '3R0316862H021340S', '2020-03-31 10:00:00', 'נחל עמוד                 ', 'צפת', '16', 'להתקשר שישלחו את המעלית הפרטית', '052-65899994', '56445665'),
		(328, 77777777, 344, '830.00', 1, '2020-03-23 06:34:56', '3AK96039L86710724', '2020-03-30 10:00:00', 'האצ\"ל                    ', 'ירושלים', '12', 'דירה 14 קומה 6', '03-465465255', ''),
		(329, 77777777, 345, '1473.00', 0, '2020-03-23 08:46:25', 'undefined', '2020-04-22 13:00:00', 'האצ\"ל                    ', 'ירושלים', 'undefined', 'דירה 14 קומה 6', '03-465465255', ''),
		(330, 77777777, 346, '1118.00', 1, '2020-03-23 11:39:24', '4HP43997ET866354C', '2020-03-31 10:00:00', 'האצ\"ל                    ', 'ירושלים', '18', 'דירה 14 קומה 6', '03-465465255', ''),
		(331, 77777777, 347, '924.00', 1, '2020-03-23 12:23:51', '4U1515269K8548831', '2020-04-08 13:00:00', 'האצ\"ל                    ', 'ירושלים', '12', 'דירה 14 קומה 6', '03-465465255', ''),
		(332, 77777777, 348, '1054.00', 1, '2020-03-23 13:49:21', '7FJ99386114667424', '2020-04-01 10:00:00', 'האצ\"ל                    ', 'ירושלים', '12', 'דירה 14 קומה 6', '03-465465255', '');`
				
module.exports = { tbl1_data, tbl2_data, tbl3_data, tbl4_data , tbl5_data, tbl6_data }
 
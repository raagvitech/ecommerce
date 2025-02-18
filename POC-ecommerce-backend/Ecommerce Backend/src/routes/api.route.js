'use strict';

const fs =require('fs');
const router = require("express").Router();
const multer = require('multer');


// //storage type 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         fs.mkdir('./uploads/',(err)=>{
//             cb(null, './uploads/');
//          });
//     },
//     filename: (req, file, cb) => {
       
//         cb(null, new Date().getTime()+"-"+file.originalname);
//     }
// });
// const upload = multer({storage: storage,});


// // Storage For editor Image

// //storage type 
// const storageEditor = multer.diskStorage({
//     destination: (req, file, cb) => {
//         fs.mkdir('./uploads/editorimage',(err)=>{
//             cb(null, './uploads/editorimage');
//          });
//     },
//     filename: (req, file, cb) => {
       
//         cb(null, new Date().getTime()+"-"+file.originalname);
//     }
// });
// const uploadEditor = multer({storage: storageEditor,});

/**
 * Middleware Imported here
 */
const auth = require('../middleware/auth.middleware');


const AuthController = require('../controllers/Auth.controller');
const ProductController = require('../controllers/Product.controller')
const CartController = require('../controllers/Cart.controller')
const CategoryController = require('../controllers/Category.controller')
const OrderController = require('../controllers/Order.controller')
const CheckoutController = require('../controllers/Checkout.controller')



router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

// products

router.post("/product/add",  auth, ProductController.add);
router.get("/product/list",  auth, ProductController.list);

//cart

router.post("/cart/add",auth, CartController.add);
router.put("/cart/quantity/update/:uuid",auth, CartController.quantityUpdate);
router.delete("/cart/delete/:uuid",auth, CartController.delete);
router.get("/cart/list",auth, CartController.list);

// Category

router.post("/category/add",auth, CategoryController.add);
router.get("/category/list",auth, CategoryController.list);

//checkout

router.post("/checkout",auth, CheckoutController.checkout);


//Order

router.post("/order/create",auth, OrderController.create);
router.get("/order/list",auth, OrderController.list);
router.get("/order/user/list",  auth, OrderController.Userlist);


module.exports = router;
const express = require('express')
const router = express.Router()

// control
const userSignUpController = require("../Controller/User/userSignUp")
const userSignInController = require("../Controller/User/userSignIn")
const userDeatilsController = require("../Controller/User/userDetail")
const authToken = require('../Middleware/AuthToken')
const userLogout = require('../Controller/User/userLogout')
const allUsers = require('../Controller/User/allUsers')
const updateUser = require('../Controller/User/updateUser')
const UploadProductController = require('../Controller/Product/uploadProduct')
const getProductController = require('../Controller/Product/getProduct')
const updateProductController = require('../Controller/Product/updateproduct')
const getProductCategory = require("../Controller/Product/getSingleProductCategory")
const getAllProductCategory = require('../Controller/Product/getAllProductCategory')
const getProductDetails = require('../Controller/Product/getProductDetails')
const addToCartController = require('../Controller/User/addToCart')
const cartProductCount = require('../Controller/User/cartProductCount')
const cartProductView = require('../Controller/User/cartProductView')
const updateCartQuantity = require('../Controller/User/updateCartQuantity')
const deleteCartproduct = require('../Controller/User/deleteCartProduct')
const searchProduct = require('../Controller/Product/Searchproduct')
const filterProduct = require('../Controller/Product/filterProduct')
const userCheckoutController = require('../Controller/User/userCheckout')
const getOrdersController = require('../Controller/Orders/orderSection')
const paymentController = require('../Controller/Orders/paymentController')
const webhooks = require('../Controller/Orders/webhook')
const orderController = require('../Controller/Orders/orderController')

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/userdetails", authToken, userDeatilsController)
router.get("/userlogout", userLogout)

// admin panel
// only show if user has logined
router.get("/allusers", authToken, allUsers)
router.post("/updateuser", authToken, updateUser)

// upload product
router.post("/uploadproduct", authToken, UploadProductController)
router.get("/getproduct", getProductController)
router.post("/updateproduct", authToken, updateProductController)
router.get("/getsingleproductcategorywise", getProductCategory)
router.post("/getAllProductCategorywise", getAllProductCategory)
router.post("/productdetails", getProductDetails)
router.get("/searchproduct", searchProduct)
router.post("/filterproduct", filterProduct)

// user cart actions
router.post("/addtocart", authToken, addToCartController)
router.post("/cartproductcount", authToken, cartProductCount)
router.get("/cartporductview", authToken, cartProductView)
router.post("/updatecartquantity", authToken, updateCartQuantity)
router.post("/deletecartproduct", authToken, deleteCartproduct)

// checkout actions
router.post("/usercheckout", authToken, userCheckoutController)
router.get("/userorders", getOrdersController)

// payments and order
router.post("/checkout", authToken, paymentController)
router.post("/webhook",webhooks) //api/webhook
router.get("/orderlist",authToken,orderController)

module.exports = router
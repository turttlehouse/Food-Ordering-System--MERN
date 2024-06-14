const { addToCart, getMyCartItems, deleteItemFromCart, updateCartItems } = require("../../controller/user/cart/cartControlller");
const isAuthenticated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();


router.route('/:productId')
.post(isAuthenticated,catchAsync(addToCart))
.delete(isAuthenticated,catchAsync(deleteItemFromCart))
.patch(isAuthenticated,catchAsync(updateCartItems))


router.route('/')
.get(isAuthenticated,catchAsync(getMyCartItems))






module.exports = router
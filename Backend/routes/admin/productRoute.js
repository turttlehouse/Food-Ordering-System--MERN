const { createProduct, deleteProduct, editProduct, updateProductStatus, updateProductStockAndPrice, getOrdersOfAProduct } = require("../../controller/admin/product/productController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const permitTo = require("../../middleware/permitTo")

const router = require("express").Router()

const{multer,storage} = require("../../middleware/multerConfig")
const { getProduct, getProducts } = require("../../controller/global/globalController")
const catchAsync = require("../../services/catchAsync")

const upload = multer({storage:storage})


router.route('/')
.post(isAuthenticated,permitTo('admin'),upload.single('productImage'),catchAsync(createProduct))
.get(catchAsync(getProducts))

router.route('/productOrders/:id')
.get(isAuthenticated,permitTo("admin"),catchAsync(getOrdersOfAProduct))

router.route('/status/:id')
.patch(isAuthenticated,permitTo('admin'),catchAsync(updateProductStatus))

router.route('/stockprice/:id')
.patch(isAuthenticated,permitTo('admin'),catchAsync(updateProductStockAndPrice))


router.route('/:id')
.get(getProduct)
.delete(isAuthenticated,permitTo("admin"),catchAsync(deleteProduct))
.patch(isAuthenticated,permitTo("admin"),upload.single("productImage"),catchAsync(editProduct))




module.exports = router


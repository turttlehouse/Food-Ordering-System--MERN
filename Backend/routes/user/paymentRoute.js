const { initiatekhaltiPayment, verifyPidx } = require("../../controller/user/payment/paymentController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()


router.route("/")
.post(catchAsync(initiatekhaltiPayment))

router.route("/verifypidx")
.post(isAuthenticated,catchAsync(verifyPidx))




module.exports = router
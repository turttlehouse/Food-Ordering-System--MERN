const { registerUser, loginUser, forgotPassword, verifyotp, resetpassword } = require("../../controller/auth/authController")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()


router.route("/register").post(catchAsync(registerUser))
router.route("/login").post(catchAsync(loginUser))

router.route("/forgotPassword").post(catchAsync(forgotPassword))
router.route("/verifyotp").post(catchAsync(verifyotp))

router.route("/resetPassword").post(catchAsync(resetpassword))


module.exports = router
const { createReview, getProductReview, deleteReview, getMyReview } = require("../../controller/user/review/reviewController");
const isAuthenticated = require("../../middleware/isAuthenticated")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()


router.route("/")
.get(isAuthenticated,catchAsync(getMyReview));

router.route("/:id")
.post(isAuthenticated,catchAsync(createReview))
.delete(isAuthenticated,catchAsync(deleteReview));



module.exports = router

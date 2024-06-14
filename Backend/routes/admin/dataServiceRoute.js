const DataServices = require("../../controller/admin/misc/DataService")
const isAuthenticated = require("../../middleware/isAuthenticated")
const permitTo = require("../../middleware/permitTo")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()

router.route("/misc/datas")
.get(isAuthenticated,permitTo("admin"),catchAsync(DataServices.getDatas))


module.exports = router
const express = require("express");
let auth = require("../middlewares/auth");
let { cacheMiddleware } = require("../middlewares/cache");
const { login, verifyOTP, viewUser } = require("../modules/user/userController");

const { listTodayMenu } = require("../modules/admin/todayMenu/todayMenuController");
const { usersOrder, addOrder, walletHistory } = require("../modules/admin/order/orderController");
// const { cacheMiddleware } = require("../middlewares/cache");

const router = express.Router();

router.post("/login", login);
router.post("/verifyOTP", verifyOTP);
router.route("/addOrder").post(auth, addOrder);

router.route("/listTodayMenu").get(listTodayMenu);

router.route("/viewUser").get(auth, viewUser);

router.route("/user-orders").get(auth, cacheMiddleware, usersOrder);

router.route("/wallet-history").get(walletHistory)

module.exports = router; 

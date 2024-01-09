const { login, verifyOTP, logout } = require("./authController");

const   userAuthRoutes = require("express").Router();

userAuthRoutes.post("/login", login);
userAuthRoutes.get("/logout", logout);
userAuthRoutes.post("/verify-otp", verifyOTP);

module.exports = userAuthRoutes;

const verifyToken = require("../../../middlewares/auth");
const {
  addTodayMenu,
  deleteTodayMenu,
  testAddFunction,
} = require("./todayMenuController");

const adminTodayMenuRoutes = require("express").Router();

adminTodayMenuRoutes.post("/add-today-menu", testAddFunction);
adminTodayMenuRoutes.delete("/delete-today-menu", deleteTodayMenu);

module.exports = adminTodayMenuRoutes;

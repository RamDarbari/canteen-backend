require("dotenv").config();
const rateLimit = require("express-rate-limit");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");


const { dataBaseConnect } = require("./config/dbConfig");
dataBaseConnect();
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

global.socketIds = [];
console.log(global.socketIds);

io.on("connection", (socket) => {
  const empId = socket.handshake.query.empId
  console.log(`Socket Initialized.`, socket.id, "with userId", empId);

  global.socketIds.push({ userId: empId, socketId: socket.id })
});

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
// });

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10000, // Max 100 requests per windowMs
// });

const adminRouter = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
// app.use(limiter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use("/", userRoutes);
app.use("/admin", adminRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in developmentnext(createError(404));
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const port = process.env.PORT || 5000;
server.listen(port, console.log("Server Connected " + port));
module.exports = { app };


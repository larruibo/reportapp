var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
const initializePassport = require("./routes/passport-config");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const mu = require("./db/MongoUtils.js");
require("dotenv").config();

var indexRouter = require("./routes/index");

var app = express();

initializePassport(passport, email => mu.passport.findEmail(email));

app.use(flash());
app.use(
  session({ secret: "cats", resave: "false", saveUninitialized: "false" })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

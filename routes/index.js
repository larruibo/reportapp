var express = require("express");
var router = express.Router();
const app = express();

const passport = require("passport");
const initializePassport = require("./passport-config");
const mu = require("../db/MongoUtils.js");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");

initializePassport(passport, email => mu.passport.findEmail(email));

app.use(flash());
app.use(
  session({ secret: "cats", resave: "false", saveUninitialized: "false" })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

/* GET home page. */
router.get("/", function(req, res, next) {
  // const name = "Luis";
  // const template = `<h1> Holi ${name} !!! </h1>`;
  // res.send(template);
  mu.reportes.find().then(reportes => {
    console.log(process.env.API_KEY);
    return res.render("index", {
      reportes: reportes,
      api_key: process.env.API_KEY
    });
  });
});

/*Registro de usuario*/
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  mu.passport.register(req.body.name, req.body.email, req.body.password);
});

router.get("/usuarios", (req, res) => {
  mu.passport.find().then(usuarios => res.json(usuarios));
});

router.get("/usuariosE", (req, res) => {
  mu.passport.findEmail().then(usuarios => res.json(usuarios));
});

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);
// Data endpoint
router.get("/reportes/:query", (req, res) => {
  console.log(req.params.query);
  const query = {
    date: new RegExp(`.*${req.params.query}.*`, "i")
  };
  mu.reportes.find(query).then(reportes => res.json(reportes));
});

//Data endopint
router.get("/reportes", (req, res) => {
  mu.reportes.find().then(reportes => res.json(reportes));
});

// Data endpoint
router.post("/reportes/create", (req, res) => {
  console.log("params", req.body);

  const reporte = {
    date: req.body.date,
    violencia: req.body.violencia,
    reporte: req.body.reporte,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    timestamp: new Date()
  };
  mu.reportes.insert(reporte).then(res.redirect("/"));
});

module.exports = router;

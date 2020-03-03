var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");
var passport = require("passport");
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


/* Mariana Rodríguez: you could modularize and separate this file into different files. 
For example, use one for all routes related to authentication (login, register,...) and 
one for all routes related to the 'reportes' element. Also, you can use middleware to configure
that some routes are only accessed if the user is (or isn't) logged in. */

const ensureNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  req.session.error = "You are already logged in!";
  res.redirect("/");
};


/*Registro de usuario*/
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  mu.passport.register(req.body.name, req.body.email, req.body.password);
  res.redirect("/");
});

router.get("/usuarios", (req, res) => {
  mu.passport.find().then(usuarios => res.json(usuarios));
});

router.get("/usuariosE", (req, res) => {
  mu.passport.findEmail("w@w").then(usuarios => res.json(usuarios));
});

router.get("/login", ensureNotAuthenticated,
  function(req, res, next) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
  })
);

/* Mariana Rodríguez: Deleted unnecessary comments. Comments explaining each method would be more useful. */
// Data endpoints
router.get("/reportes/:query", (req, res) => {
  console.log(req.params.query);
  const query = {
    date: new RegExp(`.*${req.params.query}.*`, "i")
  };
  mu.reportes.find(query).then(reportes => res.json(reportes));
});

router.get("/reportes/palabra/:query", (req, res) => {
  console.log(req.params.query);
  const query = {
    titulo: new RegExp(`.*${req.params.query}.*`, "i")
  };
  mu.reportes.find(query).then(reportes => res.json(reportes));
});

router.get("/reportes", (req, res) => {
  mu.reportes.find().then(reportes => res.json(reportes));
});

router.post("/reportes/create", (req, res) => {
  console.log("params", req.body);

  const reporte = {
    titulo: req.body.titulo,
    date: req.body.date,
    hora: req.body.hora,
    violencia: req.body.violencia,
    reporte: req.body.reporte,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    timestamp: new Date()
  };
  mu.reportes.insert(reporte).then(res.redirect("/"));
});

module.exports = router;

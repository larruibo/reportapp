var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");

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

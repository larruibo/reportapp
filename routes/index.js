var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  // const name = "Luis";
  // const template = `<h1> Holi ${name} !!! </h1>`;
  // res.send(template);
  mu.grades.find().then(grades =>
    res.render("index", {
      grades: grades
    })
  );
});

// Data endpoint
router.get("/grades/:query", (req, res) => {
  const query = {
    name: new RegExp(`.*${req.params.query}.*`, "i")
  };
  mu.grades.find(query).then(grades => res.json(grades));
});

//Data endopint
router.get("/grades", (req, res) => {
  mu.grades.find().then(grades => res.json(grades));
});

// Data endpoint
router.post("/grades/create", (req, res) => {
  console.log("params", req.body);

  const grade = {
    name: req.body.name,
    grade: req.body.grade,
    timestamp: new Date()
  };
  mu.grades.insert(grade).then(res.redirect("/"));
});

module.exports = router;

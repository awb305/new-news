// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

var express = require("express");
var router = express.Router();

var db = require("../models");

// ===============================================================================
// Routing
// ===============================================================================

// Load index page
router.get("/", function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", {
      msg: "Welcome!",
      examples: dbExamples
    });
  });
});

// Load example page and pass in an example by id
router.get("/example/:id", function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(
    dbExample
  ) {
    res.render("example", {
      example: dbExample
    });
  });
});

// Get all examples
router.get("/api/examples", function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
    res.json(dbExamples);
  });
});

// Create a new example
router.post("/api/examples", function(req, res) {
  db.Example.create(req.body).then(function(dbExample) {
    res.json(dbExample);
  });
});

// Delete an example by id
router.delete("/api/examples/:id", function(req, res) {
  db.Example.destroy({ where: { id: req.params.id } }).then(function(
    dbExample
  ) {
    res.json(dbExample);
  });
});

// ===============================================================================
// User Sign Up

// Load sign-up page
router.get("/sign-up", function(req, res) {
  res.render("sign-up");
});

// ===============================================================================
// Unmatched routes

// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  res.render("404");
});

module.exports = router;

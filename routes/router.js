// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

var express = require("express");
var router = express.Router();

var db = require("../models");

var headlineArticles = require("../news_app/testHeadlines.js");

// ===============================================================================
// Routing
// ===============================================================================

// ===============================================================================
// Home Page

// Loads example index page - replace with our own home page
// router.get("/", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.render("index", {
//       msg: "Welcome!",
//       examples: dbExamples
//     });
//   });
// });

// ===============================================================================
// Example Pages & Functionality to be removed

// Load example page and pass in an example by id
// router.get("/example/:id", function(req, res) {
//   db.Example.findOne({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.render("example", {
//       example: dbExample
//     });
//   });
// });

// Get all examples
// router.get("/api/examples", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.json(dbExamples);
//   });
// });

// Create a new example
// router.post("/api/examples", function(req, res) {
//   db.Example.create(req.body).then(function(dbExample) {
//     res.json(dbExample);
//   });
// });

// Delete an example by id
// router.delete("/api/examples/:id", function(req, res) {
//   db.Example.destroy({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.json(dbExample);
//   });
// });

// ===============================================================================
// Headlines Page

router.get("/headlines", function(req, res) {
  var displayObj = headlineArticles.getOutput();

  res.json(displayObj);

  // res.render("headlines");
});

// ===============================================================================
// News Worthy Page

router.get("/news-worthy", function(req, res) {
  res.render("worthy");
});

// ===============================================================================
// User Sign Up & Log in

// Load sign-up page
router.get("/sign-up", function(req, res) {
  res.render("sign-up");
});

// Load log-in page
router.get("/log-in", function(req, res) {
  res.render("log-in");
});

// ===============================================================================
// User Profile Pages

router.get("/user/:id", function(req, res) {
  res.render("user-profile");
});

// ===============================================================================
// Bundles Pages

router.get("/bundle/:id", function(req, res) {
  res.render("bundle-display");
});

// ===============================================================================
// Individual Article Pages

router.get("/article/:id", function(req, res) {
  res.render("article-display");
});

// ===============================================================================
// Unmatched routes

// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  res.render("404");
});

module.exports = router;

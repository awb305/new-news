// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

// var db = require("../models");

var headlineArticles = require("../news_app/testHeadlines.js");

// ===============================================================================
// Routing
// ===============================================================================
module.exports = function(app) {
  // ===============================================================================
  // Headlines Page

  app.get("/", function(req, res) {
    var displayObj = {
      title: "Top Headlines",
      articleGroup: headlineArticles.getOutput(),
      article: headlineArticles.getStories()
    };

    res.render("headlines", displayObj);
  });

  // test url for checking data
  app.get("/headlines-data", function(req, res) {
    var displayObj = {
      title: "Headlines Data",
      articleGroup: headlineArticles.getOutput(),
      article: headlineArticles.getStories()
    };

    res.json(displayObj);
  });

  // ===============================================================================
  // News Worthy Page

  app.get("/news-worthy", function(req, res) {
    res.render("worthy");
  });

  // ===============================================================================
  // User Sign Up & Log in

  // Load sign-up page
  app.get("/sign-up", function(req, res) {
    res.render("sign-up");
  });

  // Create a new user account
  app.post("/api/sign-up", function(req, res) {
    console.log(req.body);
    res.json();
  });

  // Load log-in page
  app.get("/log-in", function(req, res) {
    res.render("log-in");
  });

  // ===============================================================================
  // User Profile Pages

  app.get("/user/:id", function(req, res) {
    res.render("user-profile");
  });

  // ===============================================================================
  // Bundles Pages

  app.get("/bundle/:id", function(req, res) {
    res.render("bundle-display");
  });

  // ===============================================================================
  // Individual Article Pages

  app.get("/article/:id", function(req, res) {
    res.render("article-display");
  });

  // ===============================================================================
  // Unmatched routes

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// ===============================================================================
// Example Pages & Functionality to be removed

// Loads example index page - replace with our own home page
// router.get("/", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.render("index", {
//       msg: "Welcome!",
//       examples: dbExamples
//     });
//   });
// });

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
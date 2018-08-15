// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

var express = require("express");
var app = express.app();

// var db = require("../models");

var headlineArticles = require("../news_app/testHeadlines.js");

// ===============================================================================
// Routing
// ===============================================================================

// ===============================================================================
// Home Page

// Loads example index page - replace with our own home page
// app.get("/", function(req, res) {
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
// app.get("/example/:id", function(req, res) {
//   db.Example.findOne({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.render("example", {
//       example: dbExample
//     });
//   });
// });

// Get all examples
// app.get("/api/examples", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.json(dbExamples);
//   });
// });

// Create a new example
// app.post("/api/examples", function(req, res) {
//   db.Example.create(req.body).then(function(dbExample) {
//     res.json(dbExample);
//   });
// });

// Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//   db.Example.destroy({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.json(dbExample);
//   });
// });

// ===============================================================================
// Headlines Page

app.get("/", function (req, res) {
  var displayObj = {
    title: "Top Headlines",
    articleGroup: headlineArticles.getOutput(),
    article: headlineArticles.getStories()
  };

  res.render("headlines", displayObj);
});

// test url for checking data
app.get("/headlines-data", function (req, res) {
  var displayObj = {
    title: "Headlines Data",
    articleGroup: headlineArticles.getOutput(),
    article: headlineArticles.getStories()
  };

  res.json(displayObj);
});

// ===============================================================================
// News Worthy Page

app.get("/news-worthy", function (req, res) {
  res.render("worthy");
});

// ===============================================================================
// User Sign Up & Log in

// Load sign-up page
app.get("/sign-up", function (req, res) {
  res.render("sign-up");
});

// Load log-in page
app.get("/log-in", function (req, res) {
  res.render("log-in");
});

// ===============================================================================
// User Profile Pages

app.get("/user/:id", function (req, res) {
  res.render("user-profile");
});

// ===============================================================================
// Bundles Pages

app.get("/bundle/:id", function (req, res) {
  res.render("bundle-display");
});

// ===============================================================================
// Individual Article Pages

app.get("/article/:id", function (req, res) {
  res.render("article-display");
});

// ===============================================================================
// Unmatched routes

// Render 404 page for any unmatched routes
app.get("*", function (req, res) {
  res.render("404");
});

app.get('/bob', oidc.ensureAuthenticated(), function (req, res) {
  console.log(req.userinfo)
  res.send(req.userinfo);
});

app.get("/dashboard", oidc.ensureAuthenticated(), (req, res) => {
  console.log('login success', req.userinfo);
  res.redirect('/')
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});



module.exports = app;
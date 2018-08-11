var headlineArticles = require("../news_app/testHeadlines.js");

module.exports = function (app) {
  app.get("/", function (req, res) {
    var displayObj = {
      title: "Top Headlines",
      articleGroup: headlineArticles.getOutput(),
      article: headlineArticles.getStories()
    };

    res.render("headlines", displayObj);
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
};
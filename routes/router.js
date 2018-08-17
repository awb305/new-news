// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

// var db = require("../models");
// var headlineArticles = require("../news_app/testHeadlines.js");

var authController = require("../controllers/authcontroller.js");
var articleController = require("../controllers/articlecontroller.js");

//importing our promise object, which, after it processes, will contain our headlineArticles object, which will contain all of the original methods and also all of the articles we've added to it in the apiCalls 
var articlesRequester = require("../news_app/apiCalls.js");

var db = require("../models");
var moment = require("moment");

// ===============================================================================
// Routing
// ===============================================================================

module.exports = function(app, passport) {
  // ===============================================================================
  // Headlines Page
  app.get("/", function(req, res) {
    //call our promise object as a function and a .then so that it won't activate until the promises in apiCalls have resolved and the asynchronous data has been passed through
    articlesRequester().then(function(headlineArticles) {
      var displayObj = {
        title: "Top Headlines",
        today: moment().format("LL"),
        articleGroup: headlineArticles.articleGroups,
        allArticles: headlineArticles.articles
      };

      res.render("headlines", displayObj);
    });
  });

  // test url for checking data
  app.get("/headlines-data", function(req, res) {
    //again, call our promise object
    articlesRequester().then(function(headlineArticles) {
      var displayObj = {
        title: "Headlines Data",
        articleGroup: headlineArticles.articleGroups,
        allArticles: headlineArticles.articles
      };
      res.json(displayObj);
    });
  });

  //===============================================================================
  // News Worthy Page

  app.get("/news-worthy", function(req, res) {
    db.Article.findAll({
      where: {
        worthyScore: {
          $gt: 0
        }
      },
      limit: 50,
      order: [["date", "DESC"], ["worthyScore", "DESC"]]
    }).then(function(response) {
      var displayObj = {
        title: "News Worthy Articles",
        today: moment().format("LL"),
        worthyArticles: response
      };

      res.render("worthy", displayObj);
    });
  });

  // ===============================================================================
  // User Sign Up & Log in & Logout

  // Load sign-up page
  app.get("/sign-up", authController.signup);

  // Create new user account
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/sign-up",
      failureFlash: true
    })
  );

  // Load log-in page
  app.get("/log-in", authController.login);

  // login user
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/log-in",
      failureFlash: true
    })
  );

  // get user data
  app.get("/api/user", authController.userData);

  // logout route
  app.get("/logout", authController.logout);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/sign-up");
  }

  // ===============================================================================
  // Bundles & News Worthy Articles

  app.get("/bundle/:id", function(req, res) {
    db.Bundle.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(bundleResults) {
      // res.json(results);

      // store the articles as a variable
      var bundleArticles = bundleResults.articles;

      // extract the list of articles to an array
      var bundleArticlesArr = bundleArticles.split(", ");

      var bundleName = bundleResults.name;

      db.Article.findAll({
        where: {
          id: bundleArticlesArr
        },
        order: [["date", "DESC"]]
      }).then(function(articleResults) {

        var displayObj = {
          title: bundleName,
          bundleName: bundleName,
          bundleArticles: articleResults
        };

        res.render("bundle-display", displayObj);
      });
    });
  });

  // store an article deemed news worthy
  app.post("/api/worthy-article", articleController.worthyArticle);

  // store an article saved by a user in their saved bundle
  app.post("/api/save-article", articleController.saveArticle);

  // get user bundle data
  app.get("/api/user-bundles/:id", function(req, res) {
    console.log(req.params.id);
    db.Bundle.findAll({
      where: {
        userid: req.params.id
      }
    }).then(function(response) {
      res.json(response);
    });
  });

  // ===============================================================================
  // Unmatched routes

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

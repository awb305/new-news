// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

// var db = require("../models");
// var headlineArticles = require("../news_app/testHeadlines.js");

var authController = require("../controllers/authcontroller.js");
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
      order: [["date", "DESC"], ["worthyScore", "DESC"]]
      //attributes: ["id","articleImg","articleImgLg","title","publication","worthyScore","date","summary","url"]
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

  // Create a new user account
  app.post("/api/sign-up", function(req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        userEmail: req.body.email
      }
    }).then(function(results) {
      if (results !== null) {
        console.log("a user with that email already exists");
      } else {
        db.User.create({
          userNameFirst: req.body.name,
          userNameLast: req.body.name,
          userEmail: req.body.email,
          userPassword: req.body.password
        }).then(function(dbUser) {
          res.json(dbUser);
        });
      }
    });
  });

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

  // test dashboard page
  // app.get("/dashboard", isLoggedIn, authController.dashboard);

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
  // User Profile Pages

  app.get("/user/:id", isLoggedIn, function(req, res) {
    res.render("user-profile");
  });

  // ===============================================================================
  // Bundles & News Worthy Articles

  app.get("/bundle/:id", function(req, res) {
    res.render("bundle-display");
  });

  // store an article deemed news worthy
  app.post("/api/worthy-article", function(req, res) {
    db.Article.findOne({
      where: {
        url: req.body.url
      }
    }).then(function(results) {
      console.log(results);
      if (results !== null) {
        db.Article.update(
          {
            worthyScore: results.worthyScore + 1
          },
          {
            where: {
              url: req.body.url
            }
          }
        ).then(function(results) {
          res.json(results);
        });
        console.log("article already exists");
      } else {
        db.Article.create({
          publication: req.body.publication,
          url: req.body.url,
          headline: req.body.headline,
          section: req.body.section,
          subsection: req.body.subsection,
          title: req.body.title,
          byline: req.body.byline,
          summary: req.body.summary,
          date: req.body.date,
          articleImg: req.body.image,
          articleImgLg: req.body.imageLarge,
          worthyScore: 1
        }).then(function(dbArticle) {
          res.json(dbArticle);
        });
      }
    });
  });

  // ===============================================================================
  // Unmatched routes

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// ===============================================================================
// Individual Article Pages

// app.get("/article/:id", function(req, res) {
//   res.render("article-display");
// });

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

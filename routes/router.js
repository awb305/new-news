// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

// var db = require("../models");
// var headlineArticles = require("../news_app/testHeadlines.js");

var authController = require("../controllers/authcontroller.js");
var articleController = require("../controllers/articlecontroller.js");
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

  // store an article saved by a user
  app.post("/api/save-article", function(req, res) {
    console.log(req.body);

    // first step is to see if the article exists
    db.Article.findOne({
      where: {
        url: req.body.url
      }
    }).then(function(articleResults) {
      // check if the article exists
      if (articleResults === null) {
        // article does not exist, add to database
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
          worthyScore: 0
        }).then(function(articleResponse) {
          // store the new article ID as a string
          var articleId = articleResponse.id;

          // article has been created, check if the user has a Saved bundle
          db.Bundle.findOne({
            where: {
              userid: req.body.userId,
              name: req.body.bundle
            }
          }).then(function(bundleResults) {
            // check if the user has the bundle
            if (bundleResults === null) {
              // bundle does not exist, create it and add the article
              db.Bundle.create({
                userid: req.body.userId,
                description: "",
                name: req.body.bundle,
                articles: articleId
              }).then(function(bundleResponse) {
                // path ends, respond to user
                res.json(bundleResponse);
              });
            } else {
              // bundle does exist, add the article
              // get the current list of articles in the bundle
              var bundleArticles = bundleResults.articles;
              // add the article
              if (bundleArticles === "") {
                bundleArticles += articleId;
              } else {
                bundleArticles += ", " + articleId;
              }
              // update the bundle in the database to include the new article
              db.Bundle.update(
                {
                  articles: bundleArticles
                },
                {
                  where: {
                    userid: req.body.userId,
                    name: req.body.bundle
                  }
                }
              ).then(function(bundleResponse) {
                //path ends, respond to user
                res.json(bundleResponse);
              });
            }
          });
        });
      } else {
        // article does exist
        // store the article id
        var articleId = articleResults.id;
        // check if the user has a Saved bundle
        db.Bundle.findOne({
          where: {
            userid: req.body.userId,
            name: req.body.bundle
          }
        }).then(function(bundleResults) {
          // check if the user has the bundle
          if (bundleResults === null) {
            // bundle does not exist, create it and add the article
            db.Bundle.create({
              userid: req.body.userId,
              description: "",
              name: req.body.bundle,
              articles: articleId
            }).then(function(bundleResponse) {
              // path ends, respond to user
              res.json(bundleResponse);
            });
          } else {
            // article exists and user has Saved bundle

            // store the articles in the bundle
            var bundleArticles = bundleResults.articles;
            console.log(bundleArticles);

            // extract the list of articles to an array
            var bundleArticlesArr = bundleArticles.split(", ");
            console.log(bundleArticlesArr);
            console.log("articleId: " + articleId);

            // set a variable determining if the article is in the array to false
            var articleIncluded = false;

            // sort through the array and see if the article is in it
            for (var i = 0; i < bundleArticlesArr.length; i++) {
              // convert the item to an integer
              var parsedId = parseInt(bundleArticlesArr[i]);

              // if the article is in the array, break the for loop and respond to user
              if (parsedId === articleId) {
                articleIncluded = true;
                break;
              }
            }

            // if the article is already in the bundle
            if (articleIncluded) {
              // path ends, respond to user
              res.json(bundleResults);
            } else {
              // article is not in the bundle, add the article to the array
              bundleArticlesArr.push(articleId);

              // join the array back together
              var updatedArticles = bundleArticlesArr.join(", ");

              // update the bundle in the database
              db.Bundle.update(
                {
                  articles: updatedArticles
                },
                {
                  where: {
                    userid: req.body.userId,
                    name: req.body.bundle
                  }
                }
              ).then(function(bundleResponse) {
                //path ends, respond to user
                res.json(bundleResponse);
              });
            }
          }
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

// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

var db = require("../models");

// ==============================================================================
// Export Functions
// ==============================================================================

var exports = (module.exports = {});

exports.userBundles = function(req, res) {
  console.log(req.body.userId);
  db.Bundle.findAll({
    where: {
      userid: req.body.userId
    }
  }).then(function(response) {
    res.json(response);
  });
};

exports.worthyArticle = function(req, res) {
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
        worthyScore: 1
      }).then(function(articleResponse) {
        // store the new article ID as a string
        var articleId = articleResponse.id;

        // article has been created, check if the user has a Worthy bundle
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
      var articleWorthyScore = articleResults.worthyScore;

      // check if the user has a Saved bundle
      db.Bundle.findOne({
        where: {
          userid: req.body.userId,
          name: req.body.bundle
        }
      }).then(function(bundleResults) {
        // check if the user has the bundle
        if (bundleResults === null) {
          // worthy bundle does not exist, create it and add the article
          db.Bundle.create({
            userid: req.body.userId,
            description: "",
            name: req.body.bundle,
            articles: articleId
          }).then(function(bundleResponse) {
            // update the article's worthy score
            db.Article.update(
              {
                worthyScore: articleWorthyScore + 1
              },
              {
                where: {
                  id: articleId
                }
              }
            ).then(function(articleUpdate) {
              // path ends, respond to user
              res.json(articleUpdate);
            });
          });
        } else {
          // article exists and user has Worthy bundle

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
              db.Article.update(
                {
                  worthyScore: articleWorthyScore + 1
                },
                {
                  where: {
                    id: articleId
                  }
                }
              ).then(function(articleResults) {
                //path ends, respond to user
                res.json(bundleResponse);
              });
            });
          }
        }
      });
    }
  });
};

exports.saveArticle = function(req, res) {
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
};

// ==============================================================================
// Database Functions
// ==============================================================================

// function createBundle(bundleData, articleId) {
//   db.Bundle.create({
//     userid: bundleData.userId,
//     description: "",
//     name: bundleData.bundle,
//     articles: articleId
//   }).then(function(bundleResponse) {
//     // path ends, respond to user
//     res.json(bundleResponse);
//   });
// }

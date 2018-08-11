var db = require("../models");

module.exports = function (app, oidc) {

  app.get('/bob', oidc.ensureAuthenticated(), function (req, res) {
    console.log(req.userinfo)
    res.send(req.userinfo);
  })

  app.get("/dashboard", oidc.ensureAuthenticated(), (req, res) => {
    console.log('login success', req.userinfo);
    res.redirect('/')
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
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

};
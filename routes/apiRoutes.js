var db = require("../models");



module.exports = function (app, oidc, client) {

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



  //routes for user handling 

  app.post("/api/sign-up", function (req, res) {
    console.log('sample user', req.body);

    console.log("client", client);

    res.sendStatus(200);


    let newUser = {
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        login: req.body.email
      },
      credentials: {
        password: {
          value: req.body.password
        }
      }
    };

    client.createUser(newUser)
      .then(user => {
        console.log('Created user', user);
      });


  });

  app.post("/api/get-user", function (req, res) {
    console.log('sample user', req.body);

    console.log('test worked');

    res.sendStatus(200);

    client.getUser(req.body.email)
      .then(user => {
        console.log("user", user);
      });



  });

  app.post("/api/get-user", function (req, res) {
    console.log('sample user', req.body);

    console.log('test worked');

    res.sendStatus(200);

    client.getUser(req.body.email)
      .then(user => {
        console.log("user", user);
      });



  });

  app.post("/api/delete-user", function (req, res) {
    console.log('sample user', req.body);

    console.log('test worked');

    res.sendStatus(200);

    client.getUser(req.body.email)
      .then(user => {
        console.log("user", user);
        user.deactivate()
          .then(() => console.log('User has been deactivated'))
          .then(() => user.delete())
          .then(() => console.log('User has been deleted'));
      });

  });



};
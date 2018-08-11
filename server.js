// ==============================================================================
// Set Dependencies
// ==============================================================================

require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
const {
  ExpressOIDC
} = require('@okta/oidc-middleware');
const session = require('express-session');

var db = require("./models");


const oidc = new ExpressOIDC(Object.assign({
  issuer: "https://dev-385652.oktapreview.com/oauth2/default",
  client_id: "0oafwzfcvdzZQc5Bm0h7",
  client_secret: "23AxcKBHzaW-Q6Odo03OYI7G43Eu1bX1YQ86BXNp",
  redirect_uri: "http://localhost:3000/authorization-code/callback",
  routes: {
    callback: {
      defaultRedirect: "/dashboard"
    }
  },
  scope: "openid profile email"
}, {}));



// ==============================================================================
// Express Setup
// create the express app
// set up the express app to handle the data parsing
// use express.static to serve static pages
// ==============================================================================

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
  cookie: {
    httpOnly: true
  },
  secret: "long random string"
}));

app.use(oidc.router);

// ==============================================================================
// Handlebars Setup
// ==============================================================================

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// ==============================================================================
// Routing
// ==============================================================================

//var routes = require("./routes/router.js");

//app.use(routes);

require("./routes/apiRoutes")(app, oidc);
require("./routes/htmlRoutes")(app);

// ==============================================================================
// Database Sync Options
// ==============================================================================

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// ==============================================================================
// Server Listener
// ==============================================================================

db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
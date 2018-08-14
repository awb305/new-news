// ==============================================================================
// Set Dependencies
// ==============================================================================


// api toke 00uAx60DZmizeCiFte0S-oP3dXYzOrBLRrXDVPRt1s
// https://dev-144409.oktapreview.com Dashboard


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
  issuer: "https://dev-144409.oktapreview.com/oauth2/default",
  client_id: "0oafwiujl5Ct5uy6b0h7",
  client_secret: "9hGHTd2zsGjHYKptFcfxibNhOp13IQYNsuhtRh11",
  redirect_uri: "http://localhost:3000/authorization-code/callback",
  routes: {
    callback: {
      defaultRedirect: "/dashboard"
    }
  },
  scope: "openid profile email"
}, {}));




const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-144409.oktapreview.com/',
  token: '00uAx60DZmizeCiFte0S-oP3dXYzOrBLRrXDVPRt1s', // Obtained from Developer Dashboard
  requestExecutor: new okta.DefaultRequestExecutor() // Will be added by default in 2.0
});





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

require("./routes/apiRoutes")(app, oidc, client);
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
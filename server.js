// ==============================================================================
// Set Dependencies
// ==============================================================================

require("dotenv").config();
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var flash = require("connect-flash");

var db = require("./models");

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

// ==============================================================================
// Passport Setup
// ==============================================================================

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

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

require("./routes/router")(app, passport);

// ==============================================================================
// Load Passport Strategy
// ==============================================================================

require("./config/passport/passport.js")(passport, db.User);

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

module.exports = app;
var exports = (module.exports = {});

exports.signup = function (req, res) {
  var displayObj = {
    title: "News Worthy Sign-Up"
  };
  res.render("sign-up", displayObj);
};

exports.signupReturn = function (req, res) {
  var displayObj = {
    title: "News Worthy Sign-Up"
  };
  res.render("sign-up-return", displayObj);
};

exports.login = function (req, res) {
  var displayObj = {
    title: "News Worthy Log In"
  };
  res.render("log-in", displayObj);
};

exports.loginReturn = function (req, res) {
  var displayObj = {
    title: "News Worthy Log In"
  };
  res.render("log-in-return", displayObj);
};

exports.dashboard = function (req, res) {
  res.render("dashboard-test");
};

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
};

exports.userData = function (req, res) {
  var userData;
  try {
    userData = {
      id: req.user.id,
      firstName: req.user.userNameFirst,
      lastName: req.user.userNameLast
    };
  } catch (err) {
    userData = {
      id: "",
      firstName: "",
      lastName: ""
    };
  }
  res.json(userData);
};
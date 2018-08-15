var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("sign-up");
};

exports.login = function(req, res) {
  res.render("log-in");
};

exports.dashboard = function(req, res) {
  res.render("dashboard-test");
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
};

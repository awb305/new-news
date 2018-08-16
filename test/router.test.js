var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var authController = require("../controllers/authcontroller");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;


describe("POST /api/worth-article", function () {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({
      force: true
    });
  });

  it("return an article object", function (done) {
    var worthyArticleObj = {
      userId: "test",
      publication: "test",
      url: "test",
      headline: "test",
      section: "test",
      subsection: "test",
      title: "test",
      byline: "test",
      summary: "test",
      date: "test",
      image: "test",
      imageLarge: "test"
    };

    // POST the request body to the server
    request.post("/api/worth-article").send(worthyArticleObj).end(function (err, res) {
      // var responseStatus = res.status;
      var responseBody = res.body;
      // Run assertions on the response

      expect(res.body).to.not.be.null;
      console.log(res.body);
      done();
    });
  });
});


describe("GET /headlines-data", function () {

  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({
      force: true
    });
  });
  it("should return the displayobj", function (done) {
    request.get("/headlines-data").end(function (err, res, body) {

      expect(body).to.be.undefined;

    });
  });

});

describe('GET /news-worthy', () => {
  it('should return a rendered response', () => {
    request.get("/news-worthy").end(function (err, res) {
      expect(res.render.calledOnce).to.be.true;
    });
  });
});

describe('GET /sign-up', () => {
  it('should return a rendered response', () => {
    request.get("/sign-up").end(function (err, res) {
      expect(res).to.be.true;
    });
  });
});

describe('GET /log-in', () => {
  it('should return a rendered response', () => {
    request.get("/log-in").end(function (err, res) {
      expect(res.render.calledOnce).to.be.true;
    });
  });
});


describe('GET /api/user', () => {
  it('should return a rendered response', () => {
    request.get("/news-worthy").end(function (err, res) {
      expect(res.render.calledOnce).to.be.true;
    });
  });
});

describe('GET /logout', () => {
  it('should return a rendered response', () => {
    request.get("/logout").end(function (err, res) {
      expect(res.render.calledOnce).to.be.true;
    });
  });
});

describe('GET /bundle/:id', () => {
  it('should return a rendered response', () => {
    request.get("/bundle/:id").end(function (err, res) {
      expect(res.render.calledOnce).to.be.true;
    });
  });
});

describe('GET *', () => {
  it('should return a rendered response', () => {
    request.get("*").end(function (err, res) {
      expect(res.render.calledOnce).to.be.true;
    });
  });
});
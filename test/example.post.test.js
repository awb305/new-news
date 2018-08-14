var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
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

  it("should save an example", function (done) {
    // Create an object to send to the endpoint
    var reqBody = {
      publication: 'test',
      url: 'test',
      headline: 'test',
      section: 'test',
      subsection: 'test',
      title: 'test',
      byline: 'test',
      summary: 'test',
      date: 'test',
      articleImg: 'test',
      articleImgLg: 'test',
      worthyScore: 1
    };

    // POST the request body to the server
    request
      .post("/api/worth-article")
      .send(reqBody)
      .end(function (err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(responseBody).to.equal(reqBody);
        /* 
                expect(err).to.be.null;

                expect(responseStatus).to.equal(200);

                expect(responseBody)
                  .to.be.an("object")
                  .that.includes(reqBody); */

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});
var nyTimesApiKey = process.env.nyTimesApiKey;
var guardianApiKey = process.env.guardianApiKey;
var request = require("request");
var headlineArticles = require("./articleParser.js")

var articlesPromise = function () {
  return new Promise(function (resolve, reject) {

    Promise.all([
        new Promise((resolve, reject) =>
          request.get({
            url: "https://api.nytimes.com/svc/topstories/v2/home.json",
            qs: {
              "api-key": nyTimesApiKey,
              // "num_results": "100" - doesn't quite work
            },
          }, function (err, res, body) {
            if (err) {
              throw err;
            }
            body = JSON.parse(body);
            let nytResolve = body.results;
            resolve(nytResolve);
          })),
        new Promise((resolve, reject) =>
          request.get({
            url: "https://content.guardianapis.com/search",
            qs: {
              "api-key": guardianApiKey,
              "page-size": "75",
              "use-date": "published",
              "order-by": "newest"
            },
          }, function (err, res, body) {
            if (err) {
              throw err;
            }
            body = JSON.parse(body);
            let guardianResolve = body.response.results;
            resolve(guardianResolve);
          }))
      ]).then(function (result) {
        var nytArticles = result[0];
        nytArticles.forEach(function (element) {
          element.publication = "The New York Times";
        });
        var guardianArticles = result[1];
        guardianArticles.forEach(function (element) {
          element.publication = "The Guardian";
          element.title = element.webTitle;
          element.abstract = element.webTitle;
          element.section = element.sectionName;
          element.url = element.webUrl;
          element.date = element.webPublicationDate;
          element.subsection = element.sectionId;
          element.byline = element.type;
          element.summary = element.webTitle;
          element.image = "../public/img/guardian-logo-med.png";
          element.imageLarge = "../public/img/guardian-logo-large.png";
        })

        var allArticles = nytArticles.concat(guardianArticles);
        headlineArticles.articles = [{"results" : allArticles}];

        return headlineArticles;
      }).then(function (headlineArticles) {
        headlineArticles.getOutput();
        return headlineArticles;
      })
      .then(function (headlineArticles) {
        resolve(headlineArticles);
      });
  })
};

articlesPromise();

module.exports = articlesPromise;
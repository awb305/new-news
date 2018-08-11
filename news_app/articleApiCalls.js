// var nyTimesApiKey = process.env.nyTimesApiKey;
// var guardianApiKey = process.env.guardianApiKey;
var request = require("request");
var articles = [];
var nyTimesArticles;
var guardianArticles;

var guardianApiKey = "bc72c363-ecf4-40b2-8fd0-82fc9fb61811"
var nyTimesApiKey = "050b479b79e245f89de79c1743ea2c62"


function getNYT(secondCall, parseCB) {
  console.log(nyTimesApiKey);
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
    nyTimesArticles = body.results;
    secondCall(parseCB);
  });
}



function getGuardian(parseCB) {
  console.log(guardianApiKey);
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
    guardianArticles = body.response.results;
    // guardianArticles = body;
    parseCB();
  });
}


function parseAll() {
  allArticles = nyTimesArticles.concat(guardianArticles);
  articles.push({
    results: allArticles
  });
  // console.log(articles);
  return articles;
}

function getAllArticles() {
  getNYT(getGuardian, parseAll);
}

getAllArticles();

module.exports = getAllArticles;
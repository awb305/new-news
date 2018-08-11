var nyTimesApiKey = process.env.nyTimesApiKey;
var request = require("request");
var bodyParser = require("body-parser");
var articles = [];
var nyTimesArticles = {};

function getNYT(parseCB){
  console.log(nyTimesApiKey);
request.get({
  url: "https://api.nytimes.com/svc/topstories/v2/home.json",
  qs: {
    "api-key": nyTimesApiKey
  },
}, function(err, res, body) {
  if(err){
    throw err;
  }; 
  body = JSON.parse(body);
  nyTimesArticles = body.results;
  parseCB();
})
};

function parseNYT(){;
  articles.push({ results: nyTimesArticles })
  console.log(articles);
  console.log(articles[0].results[0])
}


getNYT(parseNYT);

module.exports = articles;
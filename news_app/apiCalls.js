var moment = require("moment");
var nyTimesApiKey = process.env.nyTimesApiKey;
var guardianApiKey = process.env.guardianApiKey;
var request = require("request");
//importing the headlineArticles object, which contains our article manipulation methods, and which we will use to store the articles themselves
var headlineArticles = require("./articleParser.js");

//wrapping the entire function in a promise object, which we will export to the router
var articlesPromise = function () {
  return new Promise(function (resolve, reject) {

    //using the .all method, which accepts an array of promises as it's parameter, to make sure all requests resolve before we move to the next step
    Promise.all([
      //nyt request promise
      new Promise(function (resolve, reject) {
        request.get({
          url: "https://api.nytimes.com/svc/topstories/v2/home.json",
          qs: {
            "api-key": nyTimesApiKey,
            // "num_results": "100" - doesn't quite work
          },
        },
        function (err, res, body) {
          if (err) {
            throw err;
          }
          body = JSON.parse(body);
          var nytResolve = body.results;
          //resolving the nyt request by returning the response to the promise object as a resolution
          resolve(nytResolve);
        });
      }),
      // guardian request promise
      new Promise(function (resolve, reject) {
        request.get({
          url: "https://content.guardianapis.com/search",
          qs: {
            "api-key": guardianApiKey,
            "page-size": "100",
            "use-date": "published",
            "order-by": "newest"
          },
        }, function (err, res, body) {
          if (err) {
            throw err;
          }
          body = JSON.parse(body);
          var guardianResolve = body.response.results;
          //resolving the guardian request by returning the response to the promise object as a resolution
          resolve(guardianResolve);
        });
      })
      //once all promises in the Promise.all array have resolved, we pass the result, an array of promise objects, to the next function
    ]).then(function (result) {
      //our nyt response is the first object in the promise object array--technically this is the 'result' property of nyt request promise object
      var nytArticles = result[0];
      // console.log(nytArticles[0]);
      nytArticles.forEach(function (element) {
        //add a couple of relevant properties to the article objects in the nyt array
        element.publication = "The New York Times";
        element.date = moment(element.updated_date).format("YYYY-MM-DD HH:mm:ss");
        element.datePretty = moment(element.updated_date).format("dddd MMMM Do h:mm a");

      });
      
      //our guardian response is the second object in the promise object array--again, this is the 'result' property of the guardian request promise object
      var guardianArticles = result[1];
      // console.log(guardianArticles[0]);
      //manipulate the article objects in the guardian array so that the properties relevant to our parser have the same naming convention as the nyt articles
      guardianArticles.forEach(function (element) {
        element.publication = "The Guardian";
        element.title = element.webTitle;
        element.abstract = "";
        element.section = element.sectionName;
        element.url = element.webUrl;
        element.date = moment(element.webPublicationDate).format("YYYY-MM-DD HH:mm:ss");
        element.datePretty = moment(element.webPublicationDate).format("dddd MMMM Do h:mm a");
        element.subsection = element.sectionName;
        element.byline = element.publication;
        element.summary = element.webTitle;
      });
      //combine the two arrays into one large array and sort the articles by date, using the article sorter method contained in the articleParser object
      var allArticles = (nytArticles
        .concat(guardianArticles))
        .sort(headlineArticles.articleSorter("date"));
      //add the combined and sorted array as a property of our headlineArticles object, which we imported from articleParser
      headlineArticles.articles = [{
        "results": allArticles
      }];
      //as long as we keep returning objects we can keep chaining .then methods and we're still inside our wrapping promise until we resolve it
      return headlineArticles;
    })
      .then(function (headlineArticles) {
        //call the getOutput method from the articleParser, which generates our articles objects and calls methods to generate and filter headlines
        headlineArticles.getOutput();
        return headlineArticles;
        //return our headlines object and call a final .then
      })
      .then(function (headlineArticles) {
        //where we resolve our wrapped promise with the headlineArticles object, including all articles, all headlines, and all methods, which we can now pass asynchronously to the router, where we'll call the promise as a function and a .then so that the route won't hit until the data has been received and the promise has been resolved
        resolve(headlineArticles);
      });
  });
};

articlesPromise();

module.exports = articlesPromise;
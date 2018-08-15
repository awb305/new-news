var headlineArticles = {
  getOutput: function () {
    var allArticlesGrouped = [];
    var allArticlesArr = [];

    var mainHeadlines = this.getHeadlines();
    var allStories = this.getStories();

    // look at each headline
    for (var i = 0; i < mainHeadlines.length; i++) {
      // create variables for the headline, the headline slug and the articles that correspond with that headline
      var headline = mainHeadlines[i];
      var headlineSlug = headline.toLowerCase();
      headlineSlug = headlineSlug.replace(/ /g, "_");
      var articles = [];

      // look at each article
      for (var j = 0; j < allStories.length; j++) {
        // if the article's headline matches the main headline, add the article to the articles array
        if (headline === allStories[j].headline) {
          articles.push(allStories[j]);
        }
      }

      var articleGroupObj = {
        headline: headline,
        headlineSlug: headlineSlug,
        articles: articles
      };

      allArticlesGrouped.push(articleGroupObj);
    }

    // for every article, add it to the allArticles array
    for (var i = 0; i < allStories.length; i++) {
      // push every article to the articles array
      allArticlesArr.push(allStories[i]);
    }


    this.articleGroups = allArticlesGrouped;
    this.articles = allArticlesArr;


    // if (typeof callback == "function") {
    //   callback(headlineArticles);
    // }
  },
  getHeadlines: function () {
    var headlines = [];
    var storiesArr = this.articles[0].results;

    for (var i = 0; i < storiesArr.length; i++) {

      var headline = "";

      if (storiesArr[i].subsection !== "") {
        headline = storiesArr[i].subsection;
      } else {
        headline = storiesArr[i].section;
      }

      if (!headlines.includes(headline)) {
        headlines.push(headline);
      }
    }

    return headlines;
  },
  getStories: function () {
    var stories = [];
    var storiesArr = this.articles[0].results;

    // for each story extract what is needed and add it to a new object
    // add the object to the stories array which is returned when this function is called
    for (var i = 0; i < storiesArr.length; i++) {

      var headline = "";

      // create a temporary id for the story
      var tempId = Math.floor(Math.random() * 10000000) + 1;
      tempId += "tid";

      // determine the headline for the story
      if (storiesArr[i].subsection !== "") {
        headline = storiesArr[i].subsection;
      } else {
        headline = storiesArr[i].section;
      }

      var articleGroupObj = {
        url: storiesArr[i].url,
        articleId: tempId,
        headline: headline,
        section: storiesArr[i].section,
        subsection: storiesArr[i].subsection,
        title: storiesArr[i].title,
        byline: storiesArr[i].byline,
        summary: storiesArr[i].abstract,
        date: storiesArr[i].published_date,
        image: function () {
          if (storiesArr[i].multimedia[3]) {
            return storiesArr[i].multimedia[3].url;
          }
        },
        imageLarge: function () {
          if (storiesArr[i].multimedia[4]) {
            return storiesArr[i].multimedia[4].url;
          }
        }
      };

      stories.push(articleGroupObj);
    }

    return stories;
  }
};

// export the object
module.exports = headlineArticles;
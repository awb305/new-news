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
      headlineSlug = headlineSlug.replace(/[\W]+/g, "_");
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
      var headline = this.headlineSetter(storiesArr[i]);

      if (headline !== "hide" && !headlines.includes(headline)) {
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
      var img;
      var imgLg;


      // assign an image if one exists, or else a default by publication if one doesn't
      if (storiesArr[i].publication === "The New York Times") {
        if (typeof storiesArr[i].multimedia[3] !== "undefined") {
          img = storiesArr[i].multimedia[3].url;
        } else {
          img = "/images/nyt-logo-med.png";
        }
        if (typeof storiesArr[i].multimedia[4] !== "undefined") {
          imgLg = storiesArr[i].multimedia[4].url;
        } else {
          imgLg = "/images/nyt-logo-lg.jpg";
        }
      } else {
        img = "/images/guardian-logo-med.png";
        imgLg = "/images/guardian-logo-large.png";
      }

      // determine the headline for the story
      var headline = this.headlineSetter(storiesArr[i]);

      var articleGroupObj = {
        url: storiesArr[i].url,
        id: tempId,
        headline: headline,
        section: storiesArr[i].section,
        subsection: storiesArr[i].subsection,
        title: storiesArr[i].title,
        byline: storiesArr[i].byline,
        summary: storiesArr[i].abstract,
        date: storiesArr[i].published_date,
        articleImg: img,
        articleImgLg: imgLg,
        publication: storiesArr[i].publication
      };

      if (headline !== "hide") {
        stories.push(articleGroupObj);
      }
    }

    return stories;
  },
  headlineSetter: function (articleObj) {
    var headline;
    var section = articleObj.subsection;

    if (section === "") {
      section = articleObj.section;
    }

    if (
      section === "Business Day" ||
      section === "Money") {
      headline = "Business";
    } else if (
      section === "Books" ||
      section === "Book Review" ||
      section === "Style" ||
      section === "Movies" ||
      section === "Film" ||
      section === "Culture" ||
      section === "Food" ||
      section === "Art and Design" ||
      section === "Television & radio" ||
      section === "Fasion" ||
      section === "T Magazine" ||
      section === "Life and style") {
      headline = "Arts & Leisure";
    } else if (
      section === "Well") {
      headline = "Health";
    } else if (
      section === "Briefing" ||
      section === "The Upshot" ||
      section === "Magazine" ||
      section === "Smarter Living" ||
      section === "Family" ||
      section === "Education") {
      headline = "Other";
    } else if (
      section === "Science" ||
      section === "Technology" ||
      section === "Environment") {
      headline = "Science & Technology";
    } else if (
      section === "Football" ||
      section === "Sport") {
      headline = "Sports";
    } else if (
      section === "US news") {
      headline = "U.S.";
    } else if (
      section === "Europe" ||
      section === "Middle East" ||
      section === "Australia news" ||
      section === "World news" ||
      section === "Global development" ||
      section === "News" ||
      section === "UK news") {
      headline = "World";
    } else if (
      section === "New York" ||
      section === "Society" ||
      section === "Real Estate" ||
      section === "Crosswords" ||
      section === "Stage") {
      headline = "hide";
    } else {
      headline = section;
    }
    return headline;
  }
};

// export the object
module.exports = headlineArticles;
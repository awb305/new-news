// ==============================================================================
// Test Object For Creating Headlines Output Page
// ==============================================================================

var headlineArticles = {
  getOutput: function() {
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

    var headlinesOutputObj = {
      articleGroups: allArticlesGrouped,
      articles: allArticlesArr
    };

    return headlinesOutputObj;
  },

  getHeadlines: function() {
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

  getStories: function() {
    var stories = [];
    var storiesArr = this.articles[0].results;

    // for each story extract what is needed and add it to a new object
    // add the object to the stories array which is returned when this function is called
    for (var i = 0; i < storiesArr.length; i++) {

      var headline = "";

      // create a temporary id for the story
      var tempId = Math.floor(Math.random() * 10000000) + 1;

      // determine the headline for the story
      if (storiesArr[i].subsection !== "") {
        headline = storiesArr[i].subsection;
      } else {
        headline = storiesArr[i].section;
      }

      var articleGroupObj = {
        // set for the example since all articles are from NYTimes
        publication: "NY Times",
        url: storiesArr[i].url,
        articleTempId: tempId,
        headline: headline,
        section: storiesArr[i].section,
        subsection: storiesArr[i].subsection,
        title: storiesArr[i].title,
        byline: storiesArr[i].byline,
        summary: storiesArr[i].abstract,
        date: storiesArr[i].published_date,
        image: storiesArr[i].multimedia[3].url,
        imageLarge: storiesArr[i].multimedia[4].url
      };

      stories.push(articleGroupObj);
    }

    return stories;
  },

  articles: [
    {
      results: [
        {
          "section": "Briefing",
          "subsection": "",
          "title": "Uber, Primaries, Russia: Your Wednesday Evening Briefing",
          "abstract": "Here’s what you need to know at the end of the day.",
          "url": "https://www.nytimes.com/2018/08/08/briefing/uber-primaries-russia.html",
          "byline": "By JOUMANA KHATIB and MARCUS PAYADUE",
          "item_type": "Article",
          "updated_date": "2018-08-08T18:17:47-04:00",
          "created_date": "2018-08-08T18:17:47-04:00",
          "published_date": "2018-08-08T18:17:47-04:00",
          "material_type_facet": "",
          "kicker": "",
          "des_facet": [],
          "org_facet": [],
          "per_facet": [],
          "geo_facet": [],
          "multimedia": [
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/08pmBriefing-US-core-trypt/08pmBriefing-US-core-trypt-thumbStandard.jpg",
              "format": "Standard Thumbnail",
              "height": 75,
              "width": 75,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": ""
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/08pmBriefing-US-core-trypt/08pmBriefing-US-core-trypt-thumbLarge.jpg",
              "format": "thumbLarge",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": ""
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/08pmBriefing-US-core-trypt/08pmBriefing-US-slide-sho-slide-SMF1-articleInline.jpg",
              "format": "Normal",
              "height": 127,
              "width": 190,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": ""
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/08pmBriefing-US-core-trypt/08pmBriefing-US-slide-sho-slide-SMF1-mediumThreeByTwo210.jpg",
              "format": "mediumThreeByTwo210",
              "height": 140,
              "width": 210,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": ""
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/08pmBriefing-US-core-trypt/08pmBriefing-US-core-trypt-superJumbo-v2.jpg",
              "format": "superJumbo",
              "height": 188,
              "width": 624,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": ""
            }
          ],
          "short_url": "https://nyti.ms/2OWaJue"
        },
        {
          "section": "Briefing",
          "subsection": "",
          "title": "Chris Collins, Tesla, Trade War: Your Thursday Briefing",
          "abstract": "Here’s what you need to know to start your day.",
          "url": "https://www.nytimes.com/2018/08/08/briefing/chris-collins-tesla-trade-war.html",
          "byline": "By CHARLES McDERMID",
          "item_type": "Article",
          "updated_date": "2018-08-08T17:31:27-04:00",
          "created_date": "2018-08-08T16:21:01-04:00",
          "published_date": "2018-08-08T16:21:01-04:00",
          "material_type_facet": "",
          "kicker": "",
          "des_facet": [],
          "org_facet": [],
          "per_facet": [],
          "geo_facet": [],
          "multimedia": [
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/09ambriefing-asia-promo/09ambriefing-asia-slide-40CQ-thumbStandard.jpg",
              "format": "Standard Thumbnail",
              "height": 75,
              "width": 75,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": "Mark Makela/Reuters"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/09ambriefing-asia-promo/09ambriefing-asia-slide-40CQ-thumbLarge.jpg",
              "format": "thumbLarge",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": "Mark Makela/Reuters"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/09ambriefing-asia-promo/09ambriefing-asia-slide-40CQ-articleInline.jpg",
              "format": "Normal",
              "height": 127,
              "width": 190,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": "Mark Makela/Reuters"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/09ambriefing-asia-promo/09ambriefing-asia-slide-40CQ-mediumThreeByTwo210.jpg",
              "format": "mediumThreeByTwo210",
              "height": 140,
              "width": 210,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": "Mark Makela/Reuters"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/08/briefing/09ambriefing-asia-promo/09ambriefing-asia-promo-superJumbo.jpg",
              "format": "superJumbo",
              "height": 188,
              "width": 624,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": "Mark Makela/Reuters"
            }
          ],
          "short_url": "https://nyti.ms/2OjbrAr"
        },
        {
          "section": "New York",
          "subsection": "",
          "title": "New York City Votes to Cap Uber and Lyft Vehicles in a Crackdown",
          "abstract": "The City Council voted on Wednesday to cap Uber vehicles and other ride-hail services.",
          "url": "https://www.nytimes.com/2018/08/08/nyregion/uber-vote-city-council-cap.html",
          "byline": "By EMMA G. FITZSIMMONS",
          "item_type": "Article",
          "updated_date": "2018-08-08T21:29:23-04:00",
          "created_date": "2018-08-08T16:11:36-04:00",
          "published_date": "2018-08-08T16:11:36-04:00",
          "material_type_facet": "",
          "kicker": "",
          "des_facet": [
            "Car Services and Livery Cabs",
            "Mobile Applications",
            "City Councils",
            "Regulation and Deregulation of Industry"
          ],
          "org_facet": [
            "Uber Technologies Inc",
            "City Council (NYC)"
          ],
          "per_facet": [
            "Johnson, Corey",
            "de Blasio, Bill"
          ],
          "geo_facet": [
            "New York City"
          ],
          "multimedia": [
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09cap-alpha/09cap-alpha-thumbStandard.jpg",
              "format": "Standard Thumbnail",
              "height": 75,
              "width": 75,
              "type": "image",
              "subtype": "photo",
              "caption": "Uber was dealt a major setback after the New York City Council voted to cap ride-hail services.",
              "copyright": "Damon Winter/The New York Times"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09cap-alpha/09cap-alpha-thumbLarge.jpg",
              "format": "thumbLarge",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "Uber was dealt a major setback after the New York City Council voted to cap ride-hail services.",
              "copyright": "Damon Winter/The New York Times"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09cap-alpha/merlin_141989814_306dc205-5707-43ac-9df1-695f81105841-articleInline.jpg",
              "format": "Normal",
              "height": 127,
              "width": 190,
              "type": "image",
              "subtype": "photo",
              "caption": "Uber was dealt a major setback after the New York City Council voted to cap ride-hail services.",
              "copyright": "Damon Winter/The New York Times"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09cap-alpha/merlin_141989814_306dc205-5707-43ac-9df1-695f81105841-mediumThreeByTwo210.jpg",
              "format": "mediumThreeByTwo210",
              "height": 140,
              "width": 210,
              "type": "image",
              "subtype": "photo",
              "caption": "Uber was dealt a major setback after the New York City Council voted to cap ride-hail services.",
              "copyright": "Damon Winter/The New York Times"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09cap-alpha/merlin_141989814_306dc205-5707-43ac-9df1-695f81105841-superJumbo.jpg",
              "format": "superJumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "Uber was dealt a major setback after the New York City Council voted to cap ride-hail services.",
              "copyright": "Damon Winter/The New York Times"
            }
          ],
          "short_url": "https://nyti.ms/2OVKGD4"
        },
        {
          "section": "World",
          "subsection": "Europe",
          "title": "U.S. to Issue New Sanctions Against Russia Over Spy Poisoning",
          "abstract": "The sanctions are part of anti-Russian efforts by the United States, even as President Trump works to forge warmer ties.",
          "url": "https://www.nytimes.com/2018/08/08/world/europe/sanctions-russia-poisoning-spy-trump-putin.html",
          "byline": "By GARDINER HARRIS",
          "item_type": "Article",
          "updated_date": "2018-08-08T21:43:19-04:00",
          "created_date": "2018-08-08T15:50:01-04:00",
          "published_date": "2018-08-08T15:50:01-04:00",
          "material_type_facet": "",
          "kicker": "",
          "des_facet": [
            "United States Politics and Government",
            "Russian Interference in 2016 US Elections and Ties to Trump Associates",
            "United States International Relations",
            "Embargoes and Sanctions",
            "Diplomatic Service, Embassies and Consulates",
            "Poisoning and Poisons",
            "Espionage and Intelligence Services",
            "Assassinations and Attempted Assassinations"
          ],
          "org_facet": [],
          "per_facet": [
            "Skripal, Sergei V",
            "Trump, Donald J",
            "Putin, Vladimir V"
          ],
          "geo_facet": [
            "Great Britain",
            "Russia"
          ],
          "multimedia": [
            {
              "url": "https://static01.nyt.com/images/2018/08/09/us/politics/09dc-sanctions-print/merlin_141463833_28baa2a7-8cea-49e6-b865-649b2e5bc1d3-thumbStandard.jpg",
              "format": "Standard Thumbnail",
              "height": 75,
              "width": 75,
              "type": "image",
              "subtype": "photo",
              "caption": "The Trump administration announced Wednesday that it would soon impose new sanctions on Russia for violating American and international laws by attempting to assassinate a former Russian spy.",
              "copyright": "Will Oliver/EPA, via Shutterstock"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/us/politics/09dc-sanctions-print/merlin_141463833_28baa2a7-8cea-49e6-b865-649b2e5bc1d3-thumbLarge.jpg",
              "format": "thumbLarge",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "The Trump administration announced Wednesday that it would soon impose new sanctions on Russia for violating American and international laws by attempting to assassinate a former Russian spy.",
              "copyright": "Will Oliver/EPA, via Shutterstock"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/us/politics/09dc-sanctions-print/merlin_141463833_28baa2a7-8cea-49e6-b865-649b2e5bc1d3-articleInline.jpg",
              "format": "Normal",
              "height": 127,
              "width": 190,
              "type": "image",
              "subtype": "photo",
              "caption": "The Trump administration announced Wednesday that it would soon impose new sanctions on Russia for violating American and international laws by attempting to assassinate a former Russian spy.",
              "copyright": "Will Oliver/EPA, via Shutterstock"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/us/politics/09dc-sanctions-print/merlin_141463833_28baa2a7-8cea-49e6-b865-649b2e5bc1d3-mediumThreeByTwo210.jpg",
              "format": "mediumThreeByTwo210",
              "height": 140,
              "width": 210,
              "type": "image",
              "subtype": "photo",
              "caption": "The Trump administration announced Wednesday that it would soon impose new sanctions on Russia for violating American and international laws by attempting to assassinate a former Russian spy.",
              "copyright": "Will Oliver/EPA, via Shutterstock"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/us/politics/09dc-sanctions-print/merlin_141463833_28baa2a7-8cea-49e6-b865-649b2e5bc1d3-superJumbo.jpg",
              "format": "superJumbo",
              "height": 1366,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "The Trump administration announced Wednesday that it would soon impose new sanctions on Russia for violating American and international laws by attempting to assassinate a former Russian spy.",
              "copyright": "Will Oliver/EPA, via Shutterstock"
            }
          ],
          "short_url": "https://nyti.ms/2OUvbvo"
        },
        {
          "section": "U.S.",
          "subsection": "Politics",
          "title": "Who Gets a New 20% Tax Break? The Treasury Dept. Speaks, and Trump May Save",
          "abstract": "Spa owners and authors appear eligible for the new break for professionals, along with some of President Trump’s real estate entities. Doctors, however, are out of luck.",
          "url": "https://www.nytimes.com/2018/08/08/us/politics/tax-deduction-pass-through-businesses.html",
          "byline": "By JIM TANKERSLEY",
          "item_type": "Article",
          "updated_date": "2018-08-08T17:35:31-04:00",
          "created_date": "2018-08-08T16:54:36-04:00",
          "published_date": "2018-08-08T16:54:36-04:00",
          "material_type_facet": "",
          "kicker": "",
          "des_facet": [
            "Tax Credits, Deductions and Exemptions",
            "Federal Taxes (US)",
            "Taxation",
            "United States Politics and Government"
          ],
          "org_facet": [
            "Internal Revenue Service",
            "Joint Committee on Taxation",
            "Treasury Department",
            "Trump Organization"
          ],
          "per_facet": [
            "Trump, Donald J"
          ],
          "geo_facet": [],
          "multimedia": [
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09dc-passthrough/09dc-passthrough-thumbStandard.jpg",
              "format": "Standard Thumbnail",
              "height": 75,
              "width": 75,
              "type": "image",
              "subtype": "photo",
              "caption": "A new 20 percent tax break for &ldquo;pass-through&rdquo; businesses included in last year&rsquo;s $1.5 trillion tax overhaul could wind up benefiting President Trump&rsquo;s real estate empire.",
              "copyright": "Alex Wroblewski for The New York Times."
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09dc-passthrough/09dc-passthrough-thumbLarge.jpg",
              "format": "thumbLarge",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "A new 20 percent tax break for &ldquo;pass-through&rdquo; businesses included in last year&rsquo;s $1.5 trillion tax overhaul could wind up benefiting President Trump&rsquo;s real estate empire.",
              "copyright": "Alex Wroblewski for The New York Times."
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09dc-passthrough/09dc-passthrough-articleInline.jpg",
              "format": "Normal",
              "height": 139,
              "width": 190,
              "type": "image",
              "subtype": "photo",
              "caption": "A new 20 percent tax break for &ldquo;pass-through&rdquo; businesses included in last year&rsquo;s $1.5 trillion tax overhaul could wind up benefiting President Trump&rsquo;s real estate empire.",
              "copyright": "Alex Wroblewski for The New York Times."
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09dc-passthrough/09dc-passthrough-mediumThreeByTwo210.jpg",
              "format": "mediumThreeByTwo210",
              "height": 140,
              "width": 210,
              "type": "image",
              "subtype": "photo",
              "caption": "A new 20 percent tax break for &ldquo;pass-through&rdquo; businesses included in last year&rsquo;s $1.5 trillion tax overhaul could wind up benefiting President Trump&rsquo;s real estate empire.",
              "copyright": "Alex Wroblewski for The New York Times."
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/business/09dc-passthrough/09dc-passthrough-superJumbo.jpg",
              "format": "superJumbo",
              "height": 1366,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "A new 20 percent tax break for &ldquo;pass-through&rdquo; businesses included in last year&rsquo;s $1.5 trillion tax overhaul could wind up benefiting President Trump&rsquo;s real estate empire.",
              "copyright": "Alex Wroblewski for The New York Times."
            }
          ],
          "short_url": "https://nyti.ms/2OS6Ki5"
        },
        {
          "section": "New York",
          "subsection": "",
          "title": "New York Congressman Chris Collins Is Charged With Insider Trading",
          "abstract": "Representative Collins, one of President Trump’s earliest and most vocal supporters, is accused of using inside information about a new drug to avoid losses.",
          "url": "https://www.nytimes.com/2018/08/08/nyregion/chris-collins-insider-trading.html",
          "byline": "By ALAN FEUER and SHANE GOLDMACHER",
          "item_type": "Article",
          "updated_date": "2018-08-08T20:14:22-04:00",
          "created_date": "2018-08-08T09:46:40-04:00",
          "published_date": "2018-08-08T09:46:40-04:00",
          "material_type_facet": "",
          "kicker": "",
          "des_facet": [
            "Insider Trading",
            "Politics and Government",
            "United States Politics and Government"
          ],
          "org_facet": [],
          "per_facet": [
            "Collins, Christopher C",
            "Trump, Donald J"
          ],
          "geo_facet": [
            "Australia"
          ],
          "multimedia": [
            {
              "url": "https://static01.nyt.com/images/2018/08/09/nyregion/09congressman1/09congressman1-thumbStandard.jpg",
              "format": "Standard Thumbnail",
              "height": 75,
              "width": 75,
              "type": "image",
              "subtype": "photo",
              "caption": "Representative Chris Collins, second from left, outside the federal courthouse in Manhattan after pleading not guilty to insider trading charges on Wednesday.",
              "copyright": "Lucas Jackson/Reuters"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/nyregion/09congressman1/09congressman1-thumbLarge.jpg",
              "format": "thumbLarge",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "Representative Chris Collins, second from left, outside the federal courthouse in Manhattan after pleading not guilty to insider trading charges on Wednesday.",
              "copyright": "Lucas Jackson/Reuters"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/nyregion/09congressman1/merlin_142138548_08b9a551-2658-425f-b843-1a5d8ac55bbe-articleInline.jpg",
              "format": "Normal",
              "height": 127,
              "width": 190,
              "type": "image",
              "subtype": "photo",
              "caption": "Representative Chris Collins, second from left, outside the federal courthouse in Manhattan after pleading not guilty to insider trading charges on Wednesday.",
              "copyright": "Lucas Jackson/Reuters"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/nyregion/09congressman1/merlin_142138548_08b9a551-2658-425f-b843-1a5d8ac55bbe-mediumThreeByTwo210.jpg",
              "format": "mediumThreeByTwo210",
              "height": 140,
              "width": 210,
              "type": "image",
              "subtype": "photo",
              "caption": "Representative Chris Collins, second from left, outside the federal courthouse in Manhattan after pleading not guilty to insider trading charges on Wednesday.",
              "copyright": "Lucas Jackson/Reuters"
            },
            {
              "url": "https://static01.nyt.com/images/2018/08/09/nyregion/09congressman1/merlin_142138548_08b9a551-2658-425f-b843-1a5d8ac55bbe-superJumbo.jpg",
              "format": "superJumbo",
              "height": 1366,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "Representative Chris Collins, second from left, outside the federal courthouse in Manhattan after pleading not guilty to insider trading charges on Wednesday.",
              "copyright": "Lucas Jackson/Reuters"
            }
          ],
          "short_url": "https://nyti.ms/2KEMSeX"
        }
      ],
    }],

};

// export the object
module.exports = headlineArticles.getOutput();
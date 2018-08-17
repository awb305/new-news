// ==============================================================================
// Set Global Variables
// ==============================================================================

var userActivitySliderOpen = false;
var navSliderOpen = false;
var headlinesSliderOpen = false;
var articleSliderOpen = false;
var bundleSliderOpen = false;
var openHeadlinesSliderName = "";
var openArticleId = "";
var userId;
var userFirstName;
var userLastName;
var bundleArticleId = "";

// ==============================================================================
// User Data
// ==============================================================================

function getUserData() {
  $.get("/api/user", function(response) {
    if (response.id !== "") {
      userId = response.id;
      userFirstName = response.firstName;
      userLastName = response.lastName;

      // update the page displays to reflect the user information
      displayUserItems();
      getUserBundles();
    }
  });
}

function displayUserItems() {
  // remove the hide-element class from user-specific items and add it to visitor specific items
  $(".visitor-item").addClass("hide-element");
  $(".user-item").removeClass("hide-element");

  // add the user's name and message to the user activity slider
  var userName = $("<h1>" + userFirstName + " " + userLastName + "</h1>");
  var message = $("<h3>Your Bundles</h3>");
  userName.appendTo(".user-activity-slider-header");
  message.appendTo(".user-activity-slider-header");
}

// ==============================================================================
// Populate User Bundles
// ==============================================================================

function getUserBundles() {
  // create the query with the user ID
  var query = "/api/user-bundles/" + userId;

  $.get(query, function(response) {
    // empty the container
    $(".user-activity-slider-body").empty();
    $(".slider-existing-bundles").empty();

    // sort through the responses and add to the page
    if (response.length > 0) {

      var customBundles = false;

      // for each response display them on the page
      for (var i = 0; i < response.length; i++) {

        // Populate all bundle names on the user activity slider
        if (response[i].name === "saved" || response[i].name === "worthy") {
          var bundleName = response[i].name + " articles";
        } else {
          var bundleName = response[i].name;
        }
        var bundle = $('<a href="/bundle/' + response[i].id + '"><h4>' + bundleName + ' &raquo;</h4></a>');
        bundle.appendTo(".user-activity-slider-body");

        // Populate all custom bundles on the bundle slider
        if (response[i].name !== "saved" && response[i].name !== "worthy") {
          customBundles = true;

          var bundleButton = $('<button class="create-bundle-btn existing-bundle-btn" bundle-id="' + response[i].name + '">' + response[i].name + '</button>');

          bundleButton.appendTo(".slider-existing-bundles");
        }
      }
    } else {
      var message = $("<h4>You have not created any bundles yet</h4>");
      // append the message to the user activity slider
      message.appendTo(".user-activity-slider-body");
    }

    if (!customBundles) {
      console.log("we got here");
      var customMessage = $("<p>You have not created any bundles yet</p>");
      customMessage.appendTo(".bundle-slider-header");
    }
  });
}

// ==============================================================================
// Worthy Button Click on Article
// ==============================================================================

$(document).on("click", ".add-worthy-btn", function(event) {
  event.preventDefault();

  var articleId = $(this).attr("data-id");

  var worthyArticleData = document.getElementById(articleId + "-data");
  // convert element to JQuery
  worthyArticleData = $(worthyArticleData);

  var worthyArticleObj = {
    bundle: "worthy",
    userId: userId,
    publication: worthyArticleData.attr("data-publication"),
    url: worthyArticleData.attr("data-url"),
    headline: worthyArticleData.attr("data-headline"),
    section: worthyArticleData.attr("data-section"),
    subsection: worthyArticleData.attr("data-subsection"),
    title: worthyArticleData.attr("data-title"),
    byline: worthyArticleData.attr("data-byline"),
    summary: worthyArticleData.attr("data-summary"),
    date: worthyArticleData.attr("data-date"),
    image: worthyArticleData.attr("data-image"),
    imageLarge: worthyArticleData.attr("data-imageLarge")
  };

  console.log(worthyArticleObj);
  worthyArticleSubmit(worthyArticleObj, articleId);
});

function worthyArticleSubmit(worthyArticle, articleId) {
  $.post("/api/worthy-article", worthyArticle, function(response) {
    console.log(response);

    var worthyButton = document.getElementById(articleId + "-worthy-btn");

    worthyButton = $(worthyButton);

    worthyButton.addClass("worthy-added");
    worthyButton.html("DEEMED WORTHY!");

    getUserBundles();
  });
}

// ==============================================================================
// Save Button Click on Article
// ==============================================================================

$(document).on("click", ".add-save-btn", function(event) {
  event.preventDefault();

  var articleId = $(this).attr("data-id");

  var savedArticleData = document.getElementById(articleId + "-data");
  // convert element to JQuery
  savedArticleData = $(savedArticleData);

  var savedArticleObj = {
    bundle: "saved",
    userId: userId,
    publication: savedArticleData.attr("data-publication"),
    url: savedArticleData.attr("data-url"),
    headline: savedArticleData.attr("data-headline"),
    section: savedArticleData.attr("data-section"),
    subsection: savedArticleData.attr("data-subsection"),
    title: savedArticleData.attr("data-title"),
    byline: savedArticleData.attr("data-byline"),
    summary: savedArticleData.attr("data-summary"),
    date: savedArticleData.attr("data-date"),
    image: savedArticleData.attr("data-image"),
    imageLarge: savedArticleData.attr("data-imageLarge")
  };

  console.log(savedArticleObj);
  savedArticleSubmit(savedArticleObj, articleId);
});

function savedArticleSubmit(savedArticle, articleId) {
  $.post("/api/save-article", savedArticle, function(response) {
    console.log(response);

    var saveButton = document.getElementById(articleId + "-save-btn");

    saveButton = $(saveButton);

    saveButton.addClass("saved-btn");
    saveButton.html("SAVED!");

    getUserBundles();
  });
}

// ==============================================================================
// Bundle Article
// ==============================================================================

$(document).on("click", ".create-bundle-btn", function(event) {
  event.preventDefault();

  var articleId = bundleArticleId;
  var bundleName = "";
  var bundleId = $(this).attr("bundle-id");

  // get the name of the bundle
  if (bundleId === "custom") {
    // store the name and description inputs
    bundleName = $("#create-bundle-name").val().trim();
    bundleName = bundleName.toLowerCase();
  } else {
    // get the bundleId from the bundle button
    bundleName = bundleId;
  }

  var bundledArticleData = document.getElementById(articleId + "-data");
  // convert element to JQuery
  bundledArticleData = $(bundledArticleData);

  var bundledArticleObj = {
    bundle: bundleName,
    userId: userId,
    publication: bundledArticleData.attr("data-publication"),
    url: bundledArticleData.attr("data-url"),
    headline: bundledArticleData.attr("data-headline"),
    section: bundledArticleData.attr("data-section"),
    subsection: bundledArticleData.attr("data-subsection"),
    title: bundledArticleData.attr("data-title"),
    byline: bundledArticleData.attr("data-byline"),
    summary: bundledArticleData.attr("data-summary"),
    date: bundledArticleData.attr("data-date"),
    image: bundledArticleData.attr("data-image"),
    imageLarge: bundledArticleData.attr("data-imageLarge")
  };

  console.log(bundledArticleObj);
  bundledArticleSubmit(bundledArticleObj, articleId);
});

function bundledArticleSubmit(bundledArticle) {
  $.post("/api/bundle-article", bundledArticle, function(response) {
    console.log(response);

    $("#create-bundle-name").val("");

    location.reload();
  });
}

// ==============================================================================
// Controlling Sliders
// ==============================================================================

function openNavSlider() {
  navSliderOpen = true;
  var navSlider = document.getElementById("nav-slider");

  // slide the sider out to the left side of the screen
  navSlider.style.left = "0";

  // add the slider-backdrop class to create a dark opaque background behind the nav slider
  $(".nav-slider-bg").addClass("nav-slider-backdrop");

  // add focus to the open slider
  navSlider.focus();

  // prevent body from being scrollable
  $("body").addClass("lock-scroll");

  // add the shadow effect to the slider
  $(navSlider).addClass("left-side-slider-shadow");

  // enable swipe to close
  enableNavSwipe(navSlider);
}

function closeNavSlider() {
  navSliderOpen = false;
  var navSlider = document.getElementById("nav-slider");

  // move the slider so that it is off the screen. The number of pixels must be equal to or greater than what is set in the css
  navSlider.style.left = "-350px";
  $(".nav-slider-bg").removeClass("nav-slider-backdrop");

  $("body").removeClass("lock-scroll");
  $(navSlider).removeClass("left-side-slider-shadow");
}

function openUserActivitySlider() {
  userActivitySliderOpen = true;
  var userActivitySlider = document.getElementById("user-activity-slider");

  // slide the slider out to the left side of the screen
  userActivitySlider.style.left = "0";

  // add the slider-backdrop class to create a dark opaque background behind the user activity slider
  $(".user-activity-slider-bg").addClass("user-activity-slider-backdrop");

  // add focus to the open slider
  userActivitySlider.focus();

  // add the shadow effect to the slider
  $(userActivitySlider).addClass("left-side-slider-shadow");

  // nudge the nav slider over
  nudgeSlider("nav", 1);

  // enable swipe to close
  enableUserActivitySwipeClose(userActivitySlider);
}

function closeUserActivitySlider() {
  userActivitySliderOpen = false;
  var userActivitySlider = document.getElementById("user-activity-slider");

  // move the slider so that it is off the screen. The number of pixels must be equal to or greater than what is set in the css
  userActivitySlider.style.left = "-350px";
  $(".user-activity-slider-bg").removeClass("user-activity-slider-backdrop");

  $(userActivitySlider).removeClass("left-side-slider-shadow");

  nudgeBackSlider("nav", 0);
}

function openBundleSlider() {
  bundleSliderOpen = true;
  var bundleSlider = document.getElementById("bundle-slider");

  // slide the slider out to the right side of the screen
  bundleSlider.style.right = "0";

  // add the slider-backdrop class
  $(".bundle-slider-bg").addClass("bundle-slider-backdrop");

  // add focus to the open slider
  bundleSlider.focus();

  // add the shadow effect to the slider
  $(bundleSlider).addClass("right-side-slider-shadow");

  if (headlinesSliderOpen) {
    // if headlinesSlider is open, nudge 2 spots
    nudgeSlider("headlines", 2);
  }

  // nudge the article slider
  nudgeSlider("article", 1);

  // enable swipe to close
  enableBundleSliderSwipeClose(bundleSlider);
}

function closeBundleSlider() {
  bundleSliderOpen = false;
  var bundleSlider = document.getElementById("bundle-slider");

  // move the slider so that it is off the screen. The number of pixels must be equal to or greater than what is set in the css
  bundleSlider.style.right = "-350px";
  $(".bundle-slider-bg").removeClass("bundle-slider-backdrop");

  $(bundleSlider).removeClass("right-side-slider-shadow");

  // check if the headlines slider is open
  if (headlinesSliderOpen) {
    // nudge open headlines slider back to spot "zero"
    nudgeBackSlider("headlines", 1);
  }

  nudgeBackSlider("article", 0);
}

function openHeadlinesSlider() {
  headlinesSliderOpen = true;
  var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");

  // slide the slider out to the right side of the screen
  currentHeadlinesSlider.style.right = "0";

  // add the slider-backdrop class to create a dark opaque background behind the headlines slider
  // slider-bg is specific to each background to keep the opacity from layering
  $("#" + openHeadlinesSliderName + "-slider-bg").addClass("headlines-slider-backdrop");

  // add focus to the current headline slider
  currentHeadlinesSlider.focus();

  // lock the body from scrolling
  $("body").addClass("lock-scroll");

  // add the shadow to the slider
  $(currentHeadlinesSlider).addClass("right-side-slider-shadow");

  // enable swipe to close
  enableHeadlinesSwipeClose(currentHeadlinesSlider);
}

function closeHeadlinesSlider() {
  headlinesSliderOpen = false;
  var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");

  // move the slider so that it is off the screen. The number of pixels must be equal to or greater than what is set in the css
  currentHeadlinesSlider.style.right = "-350px";
  $("#" + openHeadlinesSliderName + "-slider-bg").removeClass("headlines-slider-backdrop");

  // remove the lock-scroll from the body and remove the slider shadow
  $("body").removeClass("lock-scroll");
  $(currentHeadlinesSlider).removeClass("right-side-slider-shadow");

  // reset the openHeadlinesSliderName
  openHeadlinesSliderName = "";
}

function openArticleSlider() {
  articleSliderOpen = true;
  var currentArticleSlider = document.getElementById(openArticleId + "-slider");

  // slide the slider out to the right side of the screen
  currentArticleSlider.style.right = "0";

  // add the slider-backdrop class to create a dark opaque background behind the article slider
  // slider-bg is specific to each background to keep the opacity from layering
  $("#" + openArticleId + "-slider-bg").addClass("article-slider-backdrop");

  // add focus to the current headline slider
  currentArticleSlider.focus();

  // add the shadow to the slider
  $(currentArticleSlider).addClass("right-side-slider-shadow");

  // check if the headlines slider is open
  if (headlinesSliderOpen) {
    // nudge open headlines slider 1 spot
    nudgeSlider("headlines", 1);
  } else {
    // lock the body from scrolling
    $("body").addClass("lock-scroll");
  }

  // enable swipe to close
  enableArticleSwipeClose(currentArticleSlider);
}

function closeArticleSlider() {
  articleSliderOpen = false;
  var currentArticleSlider = document.getElementById(openArticleId + "-slider");

  // move the slider so that it is off the screen. The number of pixels must be equal to or greater than what is set in the css
  currentArticleSlider.style.right = "-350px";
  $("#" + openArticleId + "-slider-bg").removeClass("article-slider-backdrop");

  // remove the slider shadow
  $(currentArticleSlider).removeClass("right-side-slider-shadow");

  // check if the headlines slider is open
  if (headlinesSliderOpen) {
    // nudge open headlines slider back to spot "zero"
    nudgeBackSlider("headlines", 0);
  } else {
    // remove the body lock-scroll
    $("body").removeClass("lock-scroll");
  }

  // reset the openHeadlinesSliderName
  openArticleId = "";
}

function nudgeSlider(slider, spot) {
  var sliderLocation = "+" + (350 * spot) + "px";

  if (openNavSlider && slider === "nav") {
    var navSlider = document.getElementById("nav-slider");
    navSlider.style.left = sliderLocation;
  }
  if (openHeadlinesSlider && slider === "headlines") {
    var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");
    currentHeadlinesSlider.style.right = sliderLocation;
  }

  if (openArticleSlider && slider === "article") {
    var currentArticleSlider = document.getElementById(openArticleId + "-slider");
    currentArticleSlider.style.right = sliderLocation;
  }
}

function nudgeBackSlider(slider, spot) {
  if (openNavSlider && slider === "nav") {
    var navSlider = document.getElementById("nav-slider");

    // slide the nav slider back to the correct screen location
    var navLocation = 350 * spot + "px";
    navSlider.style.left = navLocation;
  }

  if (openHeadlinesSlider && slider === "headlines") {
    var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");

    // slide the headlines slider back to the correct screen location
    var headlinesLocation = 350 * spot + "px";
    currentHeadlinesSlider.style.right = headlinesLocation;
  }

  if (openArticleSlider && slider === "article") {
    var currentArticleSlider = document.getElementById(openArticleId + "-slider");

    // slide the articles slider back to the correct screen location
    var articleLocation = 350 * spot + "px";
    currentArticleSlider.style.right = articleLocation;
  }
}

function enableNavSwipe(slider) {
  // create a new Hammer instance and apply to the current slider. On swipe, call the close nav slider function
  var touchSlider = new Hammer(slider);
  touchSlider.on("swipeleft", closeNavSlider);
  touchSlider.on("swiperight", openUserActivitySlider);
}

function enableUserActivitySwipeClose(slider) {
  // create a new Hammer instance and apply to the current slider. On swipe, call the close user activity slider function
  var touchSlider = new Hammer(slider);
  touchSlider.on("swipeleft", closeUserActivitySlider);
}

function enableHeadlinesSwipeClose(slider) {
  // create a new Hammer instance and apply to the current slider. On swipe, call the close headlines slider function
  var touchSlider = new Hammer(slider);
  touchSlider.on("swiperight", closeHeadlinesSlider);
}

function enableArticleSwipeClose(slider) {
  // create a new Hammer instance and apply to the current slider. On swipe, call the close article slider function
  var touchSlider = new Hammer(slider);
  touchSlider.on("swiperight", closeArticleSlider);
}

function enableBundleSliderSwipeClose(slider) {
  // create a new Hammer instance and apply to the current slider. On swipe, call the close bundle slider function
  var touchSlider = new Hammer(slider);
  touchSlider.on("swiperight", closeBundleSlider);
}

// ==============================================================================
// Sliders Event Listeners
// ==============================================================================

// listener - open nav slider
$(document).on("click", ".nav-slider-trigger", function() {
  navSliderOpen ? closeNavSlider() : openNavSlider();
});

// listener - close nav slider with click outside slider
$(".nav-slider-bg").mousedown(function(e) {
  var navSlider = document.getElementById("nav-slider");

  if (!$(e.target).is(navSlider)) {
    closeNavSlider();
  }
});

// listener - open user-activity-slider
$(document).on("click", ".user-activity-slider-trigger", function() {
  openUserActivitySlider();
});

// listener - close user-activity-slider with click outside slider
$(".user-activity-slider-bg").mousedown(function(e) {
  var userActivitySlider = document.getElementById("user-activity-slider");

  if (!$(e.target).is(userActivitySlider)) {
    closeUserActivitySlider();
  }
});

// listener - open headlines slider
$(document).on("click", ".headline-button", function() {
  // get the headline id
  var headlinesId = $(this).attr("data-id");

  // store the headlinesId as the open headline slider
  openHeadlinesSliderName = headlinesId;

  openHeadlinesSlider();
});

// listener - close headlines slider with click outside slider
$(".headlines-slider-bg").mousedown(function(e) {
  var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");

  if (!$(e.target).is(currentHeadlinesSlider)) {
    closeHeadlinesSlider();
  }
});

// listener - open bundle-slider
$(document).on("click", ".bundle-slider-trigger", function() {
  bundleArticleId = $(this).attr("data-id");

  openBundleSlider();
});

// listener - close bundle-slider with click outside slider
$(".bundle-slider-bg").mousedown(function(e) {
  var bundleSlider = document.getElementById("bundle-slider");

  if (!$(e.target).is(bundleSlider)) {
    closeBundleSlider();
  }
});

// listener - open article slider
$(document).on("click", ".article-slider-trigger", function() {
  // get the article id
  var articleId = $(this).attr("data-id");

  // store the articleId as the open article slider
  openArticleId = articleId;

  openArticleSlider();
});

// listener - close article slider with click outside slider
$(".article-slider-bg").mousedown(function(e) {
  var currentArticleSlider = document.getElementById(openArticleId + "-slider");

  if (!$(e.target).is(currentArticleSlider)) {
    closeArticleSlider();
  }
});

// listener - close slider with Esc key
$(document).keyup(function(e) {
  // determine if the key pressed was Esc
  if (e.keyCode === 27) {
    // if yes, then go through the slider priority and close the approriate slider
    if (userActivitySliderOpen) {
      return closeUserActivitySlider();
    } else if (navSliderOpen) {
      return closeNavSlider();
    } else if (bundleSliderOpen) {
      return closeBundleSlider();
    } else if (articleSliderOpen) {
      return closeArticleSlider();
    } else if (headlinesSliderOpen) {
      return closeHeadlinesSlider();
    }
  }
});

// ==============================================================================
// Page Load Processes
// ==============================================================================

$(function() {
  getUserData();
});

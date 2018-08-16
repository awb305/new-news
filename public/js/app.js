// ==============================================================================
// Set Global Variables
// ==============================================================================

var navSliderOpen = false;
var headlinesSliderOpen = false;
var articleSliderOpen = false;
var bundleSliderOpen = false;
var openHeadlinesSliderName = "";
var openArticleId = "";
var userId;
var userFirstName;
var userLastName;

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
    }
  });
}

function displayUserItems() {
  // remove the hide-element class from user-specific items and add it to visitor specific items
  $(".visitor-item").addClass("hide-element");
  $(".user-item").removeClass("hide-element");

  // set the correct url for the user profile page
  var userProfileLink = "/user/" + userId;
  $(".profile-link").attr("href", userProfileLink);
}

// ==============================================================================
// Worthy Button Click on Article
// ==============================================================================

$(".add-worthy-btn").on("click", function(event) {
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
  });
}

// ==============================================================================
// Save Button Click on Article
// ==============================================================================

$(".add-save-btn").on("click", function(event) {
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
  enableNavSwipeClose(navSlider);
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
    nudgeSlider("headlines");
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

function nudgeSlider(slider) {
  if (openHeadlinesSlider && slider === "headlines") {
    var currentHeadlinesSlider = document.getElementById(openHeadlinesSliderName + "-slider");

    // slide the headlines slider 350px more
    currentHeadlinesSlider.style.right = "+350px";
  }

  if (openArticleSlider && slider === "article") {
    var currentArticleSlider = document.getElementById(openArticleId + "-slider");

    // slide the articles slider 350px more
    currentArticleSlider.style.right = "+350px";
  }
}

function nudgeBackSlider(slider, spot) {
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

function enableNavSwipeClose(slider) {
  // create a new Hammer instance and apply to the current slider. On swipe, call the close nav slider function
  var touchSlider = new Hammer(slider);
  touchSlider.on("swipeleft", closeNavSlider);
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

// listener - close headlines slider with click outside slider
$(".article-slider-bg").mousedown(function(e) {
  var currentArticleSlider = document.getElementById(openArticleId + "-slider");

  if (!$(e.target).is(currentArticleSlider)) {
    closeArticleSlider();
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

// listener - close slider with Esc key
$(document).keyup(function(e) {
  // determine if the key pressed was Esc
  if (e.keyCode === 27) {
    // if yes, then go through the slider priority and close the approriate slider
    if (navSliderOpen) {
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

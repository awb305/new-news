// ==============================================================================
// Set Global Variables
// ==============================================================================

var navSliderOpen = false;
var headlinesSliderOpen = false;
var articleSliderOpen = false;
var bundleSliderOpen = false;
var openHeadlinesSliderName = "";
var openArticleId = "";

// ==============================================================================
// User Signup
// ==============================================================================

$("#signup-submit").on("click", function(event) {
  event.preventDefault();

  var nameInput = $("#signup-name");
  var emailInput = $("#signup-email");
  var passwordInput = $("#signup-password");

  if(!nameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim()) {
    return;
  }

  var newUser = {
    name: nameInput.val().trim(),
    email: emailInput.val().trim(),
    password: passwordInput.val().trim()
  };

  console.log(newUser);

  signupSubmit(newUser);
});

function signupSubmit(newUser) {
  $.post("/api/sign-up", newUser, function(response) {
    console.log(response);
  });
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
  
  worthyArticleSubmit(worthyArticleObj);
});
  
function worthyArticleSubmit(worthyArticle) {
  $.post("/api/worthy-article", worthyArticle, function(response) {
    console.log(response);
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
  $("#" + openArticleId + "-slider-bg").addClass("headlines-slider-backdrop");

  // add focus to the current headline slider
  currentArticleSlider.focus();

  // add the shadow to the slider
  $(currentArticleSlider).addClass("right-side-slider-shadow");

  // enable swipe to close
//   enableArticleSwipeClose(currentArticleSlider);
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

// function enableArticleSwipeClose(slider) {
//   // create a new Hammer instance and apply to the current slider. On swipe, call the close article slider function
//   var touchSlider = new Hammer(slider);
//   touchSlider.on("swiperight", closeArticleSlider);
// }

// ==============================================================================
// Sliders Event Listeners
// ==============================================================================

// listener - open nav slider
$(document).on("click", ".nav-icon", function() {
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

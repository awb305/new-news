// ==============================================================================
// Set Global Variables
// ==============================================================================

var navSliderOpen = false;
var headlinesSliderOpen = false;
var articleSliderOpen = false;
var bundleSliderOpen = false;
var openModalName = "";

// ==============================================================================
// Displaying nav slider
// ==============================================================================

function openNavSlider() {
  navSliderOpen = true;
  var navSlider = document.getElementById("nav-slider");

  navSlider.style.left = "0";

  // add the sidemodal-backdrop class to create a dark opaque background behind the side modal
  $(".nav-slider-bg").addClass("nav-slider-backdrop");

  // add focus to the open modal
  navSlider.focus();

  // prevent body from being scrollable
  $("body").addClass("lock-scroll");

  // add the shadow effect
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

function openSideData() {
    modalOpen = true;
    var currentModal = document.getElementById("nav-slider");
    
    // set the width of the side modal so that it is displayed
    currentModal.style.left = "0";

    // add the sidemodal-backdrop class to create a dark opaque background behind the side modal
    $(".side-slider-bg").addClass("side-slider-backdrop");

    // add focus to the open modal
    currentModal.focus();

    // prevent body from being scrollable
    $("body").addClass("lock-scroll");
}

function closeSideData() {

    modalOpen = false;
    var currentModal = document.getElementById(openModalName + "-data-modal");

    // move the side modal so that it is off the screen. The number of pixels must be equal to or greater than what is set in the styles.css
    currentModal.style.left = "-350px";
    $(".side-modal-bg").removeClass("side-modal-backdrop");

    // remove the lock-scroll class
    $("body").removeClass('lock-scroll');


    // reset the openModalName
    openModalName = "";
}

function enableNavSwipeClose(modal) {
  // create a new Hammer instance and apply to the current modal. On swipe, call the close function
  var touchModal = new Hammer(modal);
  touchModal.on("swipeleft", closeNavSlider);
}

// ==============================================================================
// Nav Slider Event Listeners
// ==============================================================================

// listener - open nav slider
$(document).on("click", ".nav-icon", function() {
  navSliderOpen ? closeNavSlider() : openNavSlider();
});

// listener - close nav slider with Esc key
$(document).keyup(function(e) {
  if (navSliderOpen && e.keyCode === 27) {
    closeNavSlider();
  }
});

// listener - close nav slider with click outside slider
$(".nav-slider-bg").mousedown(function(e) {
  var navSlider = document.getElementById("nav-slider");

  if (!$(e.target).is(navSlider)) {
    closeNavSlider();
  }
});


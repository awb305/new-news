// Get references to page elements
var $exampleText = $("#example-text");
var userEmail = $("#signup-email");
var userSubmit = $("#signup-submit");
var userName = $("#signup-name");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db and refresh the list
$(userSubmit).on("click", function handleFormSubmit(event) {
  event.preventDefault();
  // Wont submit the user if we are missing a name or an email
  if (!userEmail.val().trim() || !userName.val().trim()) {
    alert("User name and email is required to up the article")
    return;
  }
  // Constructing a newUser object to hand to the database
  var newUser = {
    user_name : userName.val().trim(),
    user_email: userEmail.val().trim(),
  };

  console.log(newUser);
    submitUser(newUser);
});

// Submits a new user and brings user to headlines page upon completion
function submitUser(User) {
  $.post("/api/posts/", User, function() {
    window.location.href = "";
  });
}

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

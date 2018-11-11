// cartoons are listed in the array
var topics = [
  "Pinocchio",
  "Bambi",
  "Dumbo",
  "Peter pan",
  "Cinderella",
  "Alice in Wonderland",
  "Robin Hood",
  "Chicken little",
  "Lilo & Stitch",
  "Dinosaur",
  "Tarzan",
  "Mulan",
  "The Lion King",
  "Aladdin",
  "The little mermaid",
  "The jungle book",
  "Snow White",
  "Sleeping beauty",
  "Bolt"
];

var button;
var newTopic = "";

// function to create new buttons from the topics array and dispay them on the screen
var renderButtons = function() {
  // the previous div elements are emptied
  $("#buttonArea").empty();
  // loops through the array and creates buttons
  for (i = 0; i < topics.length; i++) {
    button = $("<button type=" + "button" + ">" + topics[i] + "</button>")
      .addClass("btn btn-info")
      .attr("data", topics[i]);
    $("#buttonArea").append(button);
  }
};

// click on function - generates and displays 10 gifs using  Giphy API
$("#buttonArea").on("click", ".btn", function() {
  var cartoon = $(this).attr("data");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?&api_key=HD945SmnpF9eN9jw5ge2S2CM8GE7Qhr4&q=" +
    cartoon +
    "&limit=10";
  $(".comments").show();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      // a div is created to hold a gif of any topic
      var topicDiv = $("<div>");

      // raiting added
      var p = $("<p>");
      p.text(results[i].rating);
      var p = $("<p>").text("Rating: " + results[i].rating);

      // adding a purple border for the image picture
      var topicImage = $("<img>").addClass("purpleBorder");

      // add states of animate and still
      topicImage.attr("src", results[i].images.fixed_height_still.url);
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-state", "still");
      topicImage.addClass("gif");

      // image is appended to the div
      topicDiv.append(topicImage);
      // rating is appended to the div below the gif
      topicDiv.append(p);
      // new images will be placed at the beginning (top)
      $("#gifArea").prepend(topicDiv);
    }
  });
});

// click on image to stop or animate
$("#gifArea").on("click", ".gif", function(event) {
  event.preventDefault();

  // gets the current state of the clicked gif
  var state = $(this).attr("data-state");

  // according to the current state gifs switch between animate and still
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// click submit the new cartoon to the array
$(".submit").on("click", function(event) {
  event.preventDefault();

  console.log("submit");
  // sets  value to newTopic
  newTopic = $("#topic-input").val();
  // new topic is added to the topics array
  topics.push(newTopic);
  console.log(topics);
  // call the function that creates the new button
  renderButtons();
});

renderButtons();

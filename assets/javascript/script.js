var toons = ["The Smurfs", "He-Man", "Duck Tales", "Scooby-Doo"];

function displayCartoonImages() {
    // empty image area of images to prevent duplicates on button press
    $(".image-area").empty();

    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=cartoon+" + cartoon + "&api_key=pewKlAOE556PXqIrWudsOCHIW8g3CiWo&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        for (var i = 0; i < response.data.length; i ++) {

            // Make a div for each gif to be held
            var imgBox = $("<div class='imgBox'>").html(response.data);
            $(".image-area").append(imgBox);
            // Create and append gif stills from response data
            var URL = response.data[i].images.fixed_height_still.url;
            var imgURL = response.data[i].images.fixed_height_still.url;
            var gifURL = response.data[i].images.fixed_height.url;
            //var image = $("<img class='gif'>").attr("src", imgURL);
            var image = $("<img class='gif'>").attr({"src": URL, "data-still": imgURL, "data-animate": gifURL, "data-state": "still"});
            imgBox.append(image);
            imgBox.append("<br>");
            // Create and append gif ratings from response data
            var rating = response.data[i].rating;
            var ratingDisplay = $("<div id='ratingText'>").html("Rated: " + rating);
            imgBox.append(ratingDisplay);
        }
        //change "src" to animated gif with toggle
        $(".gif").on({'click': function() {
            var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
        }});
    });
}

function renderButtons() {
    // empty image area of buttons to prevent duplicates on button press
    $("#buttons-view").empty();
    // Loops through the array of cartoons to add properties to each button
    for (var i = 0; i < toons.length; i++) {
        var newButton = $("<button class='btn btn-primary btn-lg'>");
        newButton.addClass("cartoon");
        newButton.attr("data-name", toons[i]);
        newButton.text(toons[i]);
        $("#buttons-view").append(newButton);
    }
}
// add another button for user input
$("#add-cartoon").on("click", function(event) {
    event.preventDefault();
    var cartoon = $("#cartoon-input").val().trim();
    toons.push(cartoon);
    renderButtons();
    $("#cartoon-input").val("");

});

$(document).on("click", ".cartoon", displayCartoonImages);

renderButtons();
var singers = ["Beyonce", "Aaliyah", "Rihanna", "Carrie Underwood"];

function renderButton() {

    $("#search-button").empty();

    for (i = 0; i < singers.length; i++) {

        var singersB = $("<button>")

        singersB.addClass("singers");
        singersB.attr("data-name", singers[i]);
        singersB.text(singers[i]);
        $("#search-button").append(singersB);
    }
}


function displaySinger() {
    console.log("singerz")
    var singerz = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + window.encodeURI(singerz) + "&api_key=s8kOv73tIVIy3Q7DejVKXpOJwn5ypE9D&limit=25";


    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {
            var results = response.data;
            console.log(response)
            for (let j = 0; j < results.length; j++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div class ='item'>");
                    var rating = results[j].rating;
                    var para = $("<p>").text("Rating: " + rating);
                    var singerImage = $("<img>");
                    var stillImage = results[j].images.fixed_height_still.url;
                    var animatedImage = results[j].images.fixed_height.url;
                    singerImage.attr("src", stillImage);
                    singerImage.attr("data-state", "still");
                    singerImage.attr("data-animate", animatedImage);
                    singerImage.attr("data-still", stillImage);
                    singerImage.addClass("gif");
                    gifDiv.prepend(para);
                    gifDiv.prepend(singerImage);
                    $("#singersGifs").prepend(gifDiv);
                }
            }
        })
}

$("#singersGifs").on("click", ".gif", function () {
    var state = $(this).attr("data-state")
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    //JS it logs onto console log, but will not animate.
})


$("#addSinger").on("click", function (event) {

    event.preventDefault();

    var singerStuff = $("#singers-input").val().trim();

    singers.push(singerStuff);

    renderButton();
})


$("#search-button").on("click", ".singers", displaySinger);

renderButton();
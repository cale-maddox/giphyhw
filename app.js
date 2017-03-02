var animals = ["Cat", "Dog", "koala", "kangaroo", "deer"];

function renderButtons() {

	$("#animal-view").empty();

	for (var i=0; i<animals.length; i++) {

		var newButton = $("<button>");
		newButton.attr("animalData", animals[i]);
		newButton.attr("id", "animalButton");
		newButton.text(animals[i]);
		$("#animal-view").append(newButton);

	}
}

$("#add-animal").on("click", function(event){

	animals.push($("#animal-input").val().trim());

	event.preventDefault();

	renderButtons();

});

$(document.body).on("click", "#animalButton", function(){

	$("#gifs-go-here").empty();
	
	var animal = $(this).attr("animalData");
	var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      console.log(queryURL);
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response){

    	console.log(response);

    	var results = response.data;

    	for (var i=0; i<results.length; i++) {

    		var animaldiv = $("<div>");
    		var p = $("<p>").text("Rating: " + results[i].rating);
    		var animalImage = $("<img>");
    		animalImage.attr("src", results[i].images.fixed_height_still.url);
    		animalImage.attr("data-still", results[i].images.fixed_height_still.url);
    		animalImage.attr("data-animate", results[i].images.fixed_height.url);
    		animalImage.attr("data-state", "still");
    		animalImage.attr("id", "gif");
    		animaldiv.append(p);
    		animaldiv.append(animalImage);
    		$("#gifs-go-here").prepend(animaldiv);

    	};

    });

$(document.body).on("click", "#gif", function(){
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", ($(this).attr("data-animate")));
        $(this).attr("data-state", "animate"); 
    }
    else {
      $(this).attr("src", ($(this).attr("data-still")));
      $(this).attr("data-state", "still"); 
    };

});

});

renderButtons();
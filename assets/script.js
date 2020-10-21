$(document).ready(function () {





    // When clear search history button is pressed, it clears all data from local storage and refreshes the page

    $("#clearSearchHistory").on("click", function () {
            console.log("Clear history button pressed")
            window.localStorage.clear();
            window.location.reload();
        });


});



// psuedo-code
// 1. Users can search for city in the search box
// 2. The name of the city and date display
// 3. Todays temp, icon, humidity, wind, UV display in the box
// 4. The five day forecast is populated
// 5. Searched cities appear in a list of previously searched for

// 6. When clear button is pressed, the search history is deleted -

// 7. The card footers are updated to say when it was last updated
// function dateLastModified() {
//     var x = new Date(document.lastModified);
//     document.getElementById("demo").innerHTML = x;
//   }
// moment(yourdate).fromNow()
const date = moment().format("LL");
const searchedCity = $("#citySearch input[name='city']");
const cityName = searchedCity.val();

const APIKey = "f9de6cd0ea9d859bd4d2804e8ab205c3";


const currentWeatherData = $("div.currentForecast");
console.log("City", searchedCity, currentWeatherData);


// search the API using city name
$("#searchBtn").click(function searchWeather() {
    console.log("Search button pressed");
    console.log("Searched city", searchedCity.val());
    const cityName = searchedCity.val();
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (weatherData) {
        updateResults(weatherData);
        $("#errorMsg").hide();
    }).catch(function (error) {
        console.log("whoops, error");
        $("#errorMsg").show();
    });

    function updateResults(weatherData) {
        console.log(weatherData)
        
        $("#cityName").text(cityName + ' (' + date + ') ');

        // const currentWeatherIcon = results.weather.icon;
        // const currentTemp = results.main.temp;
        // const currentHumidity = results.main.humidity;
        // const currentWind = results.wind.speed;
        // // const currentUVIndex = 
        // for ()

        // currentWeatherData.append


    // localStorage.setItem(searchedCity, weatherData);

}});


$(document).ready(function () {





    // When clear search history button is pressed, it clears all data from local storage and refreshes the page

    $("#clearSearchHistory").on("click", function () {
        window.localStorage.clear();
        window.location.reload();
    });


});


// psuedo-code
// 1. Users can search for city in the search box -
// 2. An error message appears if the city is not recognised -
// 2. The name of the city and date display -
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
const date = moment().format("LL");
const searchedCity = $("#citySearch input[name='city']");
const cityName = searchedCity.val();

const APIKey = "f9de6cd0ea9d859bd4d2804e8ab205c3";


console.log("City", searchedCity);


// search the API using city name
$("#searchBtn").click(function searchWeather() {
    console.log("Search button pressed");
    console.log("Searched city", searchedCity.val());
    const cityName = searchedCity.val();
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (weatherData) {
        updateResults(weatherData);
        showFiveDayForecast(weatherData);
        $("#errorMsg").hide();
    }).catch(function (error) {
        console.log("whoops, error");
        $("#errorMsg").show();
    });

    function updateResults(weatherData) {
        console.log(weatherData)

        const currentTemp = Math.floor(weatherData.main.temp);
        const currentHumidity = weatherData.main.humidity;
        const currentWind = weatherData.wind.speed;

        const weatherIcon = weatherData.weather[0].icon;
        const getWeatherIcon = "http://openweathermap.org/img/wn/";
        const weatherIconURL = getWeatherIcon + weatherIcon + ".png";
        console.log(weatherIconURL)
        
        $("#cityName").text(cityName + ' (' + date + ') ');
        $("#currentWeatherImg").attr("src", weatherIconURL);
        $("#currentTemp").text("Temperature: " + currentTemp + " °C");
        $("#currentHumidity").text("Humidity: " + currentHumidity + " %");
        $("#currentWind").text("Wind Speed: " + currentWind + " MPH");
        // $("#currentUVIndex").text("UV Index: " + currentUVIndex);


    // localStorage.setItem(cityName, weatherData);

}});

function showFiveDayForecast(weatherData) {
    $("#fiveDayForecast").show();

    const forecastQueryURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + APIKey;
    const currentTime = moment().format("LT");



        $(".dateLastModified").text("Last updated " + currentTime);

};

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
// 3. The name of the city and date display -
// 4. Todays temp, humidity, wind, display on search -
// 5. Todays weather icon displays -
// 6. The UV index is displayed for today
// 7. The five day forecast is populated
// 8. Searched cities appear in a list of previously searched for
// 9. When clear button is pressed, the search history is deleted -
// 10. The card footers are updated to say when it was last updated -
// 11. Previous searches are saved in local storage
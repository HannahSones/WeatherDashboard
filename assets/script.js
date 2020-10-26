const date = moment().format("LL");
const searchedCity = $("#citySearch input[name='city']");

const APIKey = "f9de6cd0ea9d859bd4d2804e8ab205c3";

let searchHistory = [];


$("#searchBtn").click(function() {
console.log("Search button pressed");
console.log("Searched city", searchedCity.val());
searchWeather();
});


$("#clearSearchHistory").on("click", function () {
    console.log("clear button pressed");
    window.localStorage.clear();
    window.location.reload();
});


function searchWeather() {
    const cityName = searchedCity.val();
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;
    console.log("Todays weather URL", queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (weatherData) {
        updateResults(weatherData);
        showFiveDayForecast();
        $("#errorMsg").hide();
    }).catch(function (error) {
        console.log("Request failed: city name not recognised");
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

        $("#cityName").text(cityName + ' (' + date + ') ');
        $("#currentWeatherImg").attr("src", weatherIconURL);
        $("#currentTemp").text("Temperature: " + currentTemp + " °C");
        $("#currentHumidity").text("Humidity: " + currentHumidity + " %");
        $("#currentWind").text("Wind Speed: " + currentWind + " MPH");


        // Getting the UV Index value and updating the background colour depending on conditions
        const uvAPI = "http://api.openweathermap.org/data/2.5/uvi?lat=";
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        const uvIndexURL = uvAPI + lat + '&lon=' + lon + "&appid=" + APIKey;
        console.log("UV Index URL", uvIndexURL)

        $.ajax({
            url: uvIndexURL,
            method: 'GET'
        }).then(function (uvData) {
            $("#currentUVIndex").html("UV Index: " +
                '<span class="badge badge-pill">' +
                uvData.value +
                '</span>');

            if (uvData.value < 3) {
                $(".badge-pill").css("background-color", "green");
            } else if (uvData.value < 6) {
                $(".badge-pill").css("background-color", "yellow");
            } else if (uvData.value < 8) {
                $(".badge-pill").css("background-color", "orange");
            } else if (uvData.value < 11) {
                $(".badge-pill").css("background-color", "red");
            } else {
                $(".badge-pill").css("background-color", "purple");
            }
        });


        const currentTime = moment().format("LT");
        $(".dateLastModified").text("Last updated " + currentTime);

        // Add searches to search history list
        $("#previousSearches").find("ul").prepend($("<li>").addClass("list-group-item").text(cityName));

        // Save searches into an array in local storage
        searchHistory.unshift(cityName)
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    }
};

// Getting the data for the 5-day forecast
function showFiveDayForecast() {
    $("#fiveDayForecast").show();

    const searchedCity = $("#citySearch input[name='city']");
    const cityName = searchedCity.val();
    const forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + APIKey;
    console.log("5 day forecast URL", forecastQueryURL);

    $.ajax({
        url: forecastQueryURL,
        method: 'GET'
    }).then(function (forecastData) {
        var forecastArr = [];

        for (var i = 5; i < 40; i += 8) {
            const forecastObj = {};
            const forecastDate = forecastData.list[i].dt_txt;
            const forecastDateUK = new Date(forecastDate).toLocaleDateString("en-GB");

            const forecastIcon = forecastData.list[i].weather[0].icon;
            const forecastTemp = forecastData.list[i].main.temp;
            const forecastHumidity = forecastData.list[i].main.humidity;

            forecastObj["list"] = {};
            forecastObj["list"]["date"] = forecastDateUK;
            forecastObj["list"]["icon"] = forecastIcon;
            forecastObj["list"]["temp"] = forecastTemp;
            forecastObj["list"]["humidity"] = forecastHumidity;

            forecastArr.push(forecastObj);
        };

        for (var j = 0; j < 5; j++) {
            const forecastArrDate = forecastArr[j].list.date;
            const getWeatherIcon = "http://openweathermap.org/img/wn/";
            const forecastIconURL = getWeatherIcon + forecastArr[j].list.icon + ".png";
            const forecastArrTemp = Math.floor(forecastArr[j].list.temp);
            const forecastArrHumidity = forecastArr[j].list.humidity;

            $("#fiveDayDate" + (j + 1)).text(forecastArrDate);
            $("#fiveDayIcon" + (j + 1)).attr("src", forecastIconURL);
            $("#fiveDayTemp" + (j + 1)).text(
                "Temperature: " + Math.floor(forecastArrTemp) + "°C"
            );
            $("#fiveDayHumidity" + (j + 1)).text(
                "Humidity: " + forecastArrHumidity + "%"
            );
        }
    });
};

// Adds previous searches from local storage and displays them as list items under the search history
function getSearchHistory() {
    const storedSearches = localStorage.getItem("searchHistory");

    if (storedSearches !== null) {
        searchHistory = storedSearches
        searchHistory.forEach(city => {
            $("#previousSearches").find("ul").append($("<li>").addClass("list-group-item").text(city));
        });
    }
};

function displayMostRecentSearch() {

    const getStoredSearches = localStorage.getItem("searchHistory");
    const storedSearches = JSON.parse(getStoredSearches);

    if (storedSearches != null && storedSearches.length > 0) {
        const mostRecentSearch = (storedSearches[0]);
        console.log(mostRecentSearch);
        (searchedCity).value = mostRecentSearch;

        const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + mostRecentSearch + "&units=metric&appid=" + APIKey;
        console.log("Todays weather URL", queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function () {
            searchWeather();
            showFiveDayForecast();
            $("#errorMsg").hide();
        });


// When clear search history button is pressed, it clears all data from local storage and refreshes the page



$(document).ready(function () {
    
    getSearchHistory();


})}};
# WeatherDashboard
Build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

## Table of contents
* [About](#about-the-project)
  * [Built using](#built-using)
* [Functionality](#functionality)
* [Finished output](#finished-output)
* [Improvements](#improvements)
* [Link to application](#link-to-deployed-application)

----------

## About the project
For this project, I have built an interactive Weather Dashboard that presents users with the current and future weather forecast for their searched city. Using the OpenWeather API and jQuery, the dashboard pulls the required data into the browser updating the HTML and CSS dynamically.

To make it more user friendly for UK users, I added units=metric to the search URL so data is returned in celsius rather than fahrenheit. I also converted the date value using .toLocaleDateString("en-GB") so that it is a better format for UK users. To display the date dynamically, the dashboard is powered predominantly by jQuery and uses the Moment.js library. I have also added a feature which displays the time of the last search.

Each search is saved into local storage, and displays on the left-hand side in a list of previous searches so the user can easily access them again. When clicked, it will reload the weather data for that searched city. When the page is refreshed, it displays the values of the city last searched. I have also added a clear search history button to improve the user experience so that they can clear the data saved completely and start again. The clear schedule button empties the values saved in local storage as well as automatically refreshing the page so the user has a clean weather dashboard.

I took advantage of having no predetermined style sheet with this project and used the opportunity to experiment with CSS and different properties. To make it responsive, I used a few pre-built Bootstrap elements, but then added my own styling to these to match the overall look.


## Built using
* JavaScript
* jQuery
* HTML
* CSS
* Bootstrap
* OpenWeather API

----------

## Functionality
* When the Weather Dashboard is first loaded, the dashboard is empty and the forecast containers don't appear until a city has been searched.
* Once a user searches for a city in the search bar, they are presented with the current weather conditions as well as a future, 5-day forecast for that city. The city is then also added to the search history container on the left-hand side.
* For the current weather conditions, the user is shown the city name, today's date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index. The UV index gives a coloured background to indicate the severity of the conditions.
* The 5-day forecast displays the date, an icon representation of weather conditions, the temperature, and the humidity.
* When the clear search history button is clicked, the search history in the left-hand side is cleared, information from local storage is cleared, and the page is refreshed to display a new, blank page.

-----------
## Finished output
The screen you are first presented with, when first loading the Weather Dashboard.
![Weather Dashboard inital homepage](https://github.com/HannahSones/WeatherDashboard/blob/main/assets/Screengrabs/WeatherDashboard%20HomeScreen.png)
Example of a city search displaying the current weather and 5-day forecast.
![Example of search](https://github.com/HannahSones/WeatherDashboard/blob/main/assets/Screengrabs/WeatherDashboard%20ExampleSearch.png)
The search history is displayed on the left-hand side.
![Search history](https://github.com/HannahSones/WeatherDashboard/blob/main/assets/Screengrabs/WeatherDashboard%20SearchHistory.png)
If the user doesn't enter a correct city or leaves the search box blank, an error message will appear on screen.
![Error message](https://github.com/HannahSones/WeatherDashboard/blob/main/assets/Screengrabs/WeatherDashboard%20ErrorMessage.png)

-------------
## Improvements
* When the page reloads with data for the most recent city searched, it re-adds this to the search history. I'd like to refactor the code so that it doesn't add to the search history for a second time.

--------------
## Link to deployed application
https://hannahsones.github.io/WeatherDashboard/

------------
© Hannah Sones. All rights reserved.

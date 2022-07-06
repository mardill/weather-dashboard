// build search button: translate lat lon. need api?

// populate city stats in top right


// populate 5 day forcast in bottom right


// local storage to save city searches
    // make save city searches buttons to click to get data to populate again


var citySearch = document.getElementById("add-city");
var apiKey = "166a433c57516f51dfab1f7edaed8413";
var historyArr = JSON.parse(localStorage.getItem('history')) || []

function getSearches(){

}

function cityInput(event){
    event.preventDefault();
    console.log('Working')
    //grab the text from the input;
    var cityName = document.getElementById("city-search").value;
    console.log(cityName);
    searchWeather(cityName)
};

function searchWeather(city){
console.log(city)
    //make our api call
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then(response => response.json())
    .then(data => {
console.log(history)
//check to see if this city exists in LS 
 if(historyArr.indexOf(city) === -1){
     historyArr.push(city);
     console.log(historyArr)
     localStorage.setItem('history', JSON.stringify(historyArr));
 }




        console.log(data);
        var date = new Date().toLocaleDateString();

        //city name
        var searchedCity= document.createElement("h2")
        searchedCity.textContent = data.name + " " + date;

        //date

        //current temp
        var temp = document.createElement("p")
        temp.textContent = "Temp: " + data.main.temp

        //humidity
        var humidity = document.createElement("p")
        humidity.textContent = "Humidity: " + data.main.humidity

        //wind speed
        var windSpeed = document.createElement("p")
        windSpeed.textContent = "Wind Speed: " + data.wind.speed

        //uv index

        document.getElementById("city-stats").appendChild(searchedCity)
        document.getElementById("city-stats").appendChild(temp)
        document.getElementById("city-stats").appendChild(humidity)
        document.getElementById("city-stats").appendChild(windSpeed)

        // THEN I am presented with the city name, the date, an icon representation of weather conditions, 
        //the temperature, the humidity, the wind speed, and the UV index

        uvIndex(data.coord.lat, data.coord.lon)

    });

}

function uvIndex(lat,lon){
    console.log(lat,lon)

    var url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

    fetch(url)
    .then(response => response.json())
    .then(data => {

        var uvIndex = document.createElement("p")
        uvIndex.textContent = "UV Index: " + data.value
        console.log(data)

        document.getElementById("city-stats").appendChild(uvIndex)
    })
}

citySearch.addEventListener("click", cityInput);

// function fetchWeather(userInput)
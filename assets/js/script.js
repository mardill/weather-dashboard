// build search button: translate lat lon. need api?

// populate city stats in top right


// populate 5 day forcast in bottom right


// local storage to save city searches
    // make save city searches buttons to click to get data to populate again


var citySearch = document.getElementById("add-city");
var apiKey = "166a433c57516f51dfab1f7edaed8413";
var historyArr = JSON.parse(localStorage.getItem('history')) || []





function cityInput(event){
    event.preventDefault();
    //grab the text from the input;
    var cityName = document.getElementById("city-search").value;
    console.log(cityName);
    searchWeather(cityName)
    dayForecast(cityName)
};



// set up weather api and populate local weather
function searchWeather(city){
console.log(city)
    //make our api call
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then(response => response.json())
    .then(data => {


    //check to see if this city exists in local storage
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
    uvIndex(data.coord.lat, data.coord.lon)
    

    document.getElementById("city-stats").appendChild(searchedCity)
    document.getElementById("city-stats").appendChild(temp)
    document.getElementById("city-stats").appendChild(humidity)
    document.getElementById("city-stats").appendChild(windSpeed)
    });

}

// get uvi index from api
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

// style uv-index
function uvStyle(index){
    if(index >= 7){
        Element.classList.add("uv-index-high")
    }else if(index > 3){
        Element.classList.add("uv-index-medium")
    }else{
        Element.classList.add("uv-index-low")
    }
}

// api for 5 day forecast
function dayForecast(city){
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        for(var i=7; i; i++){
            
            //date
            var forecastDate= document.createElement("h2")
            forecastDate.textContent = data.list[i].dt_txt

            //temp
            var temp = document.createElement("p")
            temp.textContent = "Temp: " + data.list[i].main.temp

            //wind
            var wind = document.createElement("p")
            wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH"

            //humidity
            var humid = document.createElement("p")
            humid.textContent = "Humidity: " + data.list[i].main.humidity

            document.getElementById("forecast").appendChild(forecastDate)
            document.getElementById("forecast").appendChild(temp)
            document.getElementById("forecast").appendChild(wind)
            document.getElementById("forecast").appendChild(humid)
        }

    })
}



// click historical searches to get data
function getSearches(){

    var searchData =  JSON.parse(localStorage.getItem('history'))

    for(i=0; i < searchData.length; i++){

        var savedCity = document.createElement("button")
        savedCity.textContent = searchData[i]

        document.getElementById("searchRes").appendChild(savedCity)
    }
}
getSearches()

// create event for saved cities

// event listener for search button
citySearch.addEventListener("click", cityInput);






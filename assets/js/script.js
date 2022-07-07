var citySearch = document.getElementById("add-city");
var apiKey = "166a433c57516f51dfab1f7edaed8413";
var historyArr = JSON.parse(localStorage.getItem('history')) || []
var searchResults = document.getElementById("searchRes");





// takes value from text box and runs functions when "search" button is clicked
function cityInput(event){
    event.preventDefault();
    //grab the text from the input;
    var cityName = document.getElementById("city-search").value;
    doSearch(cityName);
};

// function to run search bar
function doSearch(cityName){
    console.log(cityName);
    searchWeather(cityName);;
    dayForecast(cityName)
}



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
        console.log(historyArr);
        localStorage.setItem('history', JSON.stringify(historyArr));
    }

    console.log(data);

    // add date to current weather
    var date = new Date().toLocaleDateString();

    //city name
    var searchedCity= document.createElement("h2");
    searchedCity.textContent = data.name + " " + date;

    //current temp
    var temp = document.createElement("p");
    temp.textContent = "Temp: " + data.main.temp;

    //humidity
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + data.main.humidity;

    //wind speed
    var windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: " + data.wind.speed;

    //uv index
    uvIndex(data.coord.lat, data.coord.lon);

    var iconCode = document.createElement("img");
    iconCode.textContent = data.weather[0].icon;
    console.log(iconCode.textContent);

    iconCode.src = `http://openweathermap.org/img/wn/${iconCode.textContent}@2x.png`;
    console.log(iconCode.src);


    document.getElementById("city-stats").appendChild(searchedCity);
    document.getElementById("city-stats").appendChild(iconCode);
    document.getElementById("city-stats").appendChild(temp);
    document.getElementById("city-stats").appendChild(humidity);
    document.getElementById("city-stats").appendChild(windSpeed);
    });

}

// get uvi index from api
function uvIndex(lat,lon){
    console.log(lat,lon);

    var url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

    fetch(url)
    .then(response => response.json())
    .then(data => {

        var uvIndex = document.createElement("p");
        uvIndex.textContent = "UV Index: " + data.value;
        console.log(data.value);

        // add uv index color styling
        function uvStyle(){
            if(data.value >= 7){
                uvIndex.classList.add("uv-index-high");
            }else if(data.value > 3){
                uvIndex.classList.add("uv-index-medium");
            }else{
                uvIndex.classList.add("uv-index-low");
            }
        }
        uvStyle();
        
    
        document.getElementById("city-stats").appendChild(uvIndex);
    })
}


// api for 5 day forecast
function dayForecast(city){
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        console.log(data.list.length)
      
        // get each time from array skip every 8. multiple values for single days
        for(var i=0; i < data.list.length-7; i+=8){

            //date
            var forecastDate= document.createElement("h6");
            forecastDate.textContent = data.list[i].dt_txt.split(" ")[0].replace('-','/').replace('-','/');

            var iconCode = document.createElement("img");
            iconCode.textContent = data.list[i].weather[0].icon;
            console.log(iconCode.textContent)
        
            iconCode.src = `http://openweathermap.org/img/wn/${iconCode.textContent}@2x.png`;
            console.log(iconCode.src);

            //temp
            var temp = document.createElement("p");
            temp.textContent = "Temp: " + data.list[i].main.temp;

            //wind
            var wind = document.createElement("p");
            wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";

            //humidity
            var humid = document.createElement("p");
            humid.textContent = "Humidity: " + data.list[i].main.humidity;
 
            
            document.getElementById("forecast").appendChild(forecastDate); 
            document.getElementById("forecast").appendChild(iconCode);
            document.getElementById("forecast").appendChild(temp);
            document.getElementById("forecast").appendChild(wind);
            document.getElementById("forecast").appendChild(humid);
        }
    
        console.log(wind);


    })
}

// create historical search buttons
function getSearches(){

    var searchData =  JSON.parse(localStorage.getItem('history'));
    if (searchData == null) {
        return;
    }

    // create button and search for store values
    for(i=0; i < searchData.length; i++){

        var savedCity = document.createElement("button");
        savedCity.classList.add('saveCityBtn');
        savedCity.textContent = searchData[i] ;

        document.getElementById("searchRes").appendChild(savedCity);

        // event listener for stored city buttons
        savedCity.addEventListener('click', function(event){
            city = event.target.textContent;
            doSearch(city) ;
        }) 
    } 
}

getSearches();

// event listener for search button
citySearch.addEventListener("click", cityInput);



// to do

// create cards for forecast




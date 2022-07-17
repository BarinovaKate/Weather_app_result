// format date
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day}  ${hours}:${minutes}`;
}

//format day
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sun", 
        "Mon", 
        "Tue", 
        "Wed", 
        "Thu", 
        "Fri", 
        "Sat"
    ];
    
    return days[day];
  }

//forecast display
function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
     
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
   forecastHTML =
    forecastHTML +
     `
    <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img 
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
     alt="" 
     width="42"/>
     </br>
    <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round
            (forecastDay.temp.max)}°</span>
        <span class="weather-forecast-temperature-min">${Math.round
            (forecastDay.temp.min)}°</span>
    </div>
    </div>
    `;    
    }
    });
 
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

//coordinates city
function getForecast(coordinates) {
    let apiKey = "88400465a62856e7c584fa794d05d7d7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

//show weather element
function displayTemperature(response) {
   
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

//search city input
function search(city) {
    let apiKey = "88400465a62856e7c584fa794d05d7d7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayTemperature);
}
//submit "search"
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
//converter C-F
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
//converter F-C
function displayCelsiusTemperature(event) {
    event.preventDefault(); 
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature"); 
    temperatureElement.innerHTML = Math.round(celsiusTemperature);  
}
let celsiusTemperature = null;

//submit form
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


//click F
let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
//click C
let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//current position
function currentCity(event) {
  event.preventDefault();
  
  function myPosition(position) {
  let apiKey = "88400465a62856e7c584fa794d05d7d7";
  let apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude; 
  axios.get(`${apiUrl}&lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`).then(currentWeather);
}
  navigator.geolocation.getCurrentPosition(myPosition); 
  function currentWeather(response) {
    document.querySelector("#city").innerHTML = `${response.data.name}`;
    document.querySelector("#temperature").innerHTML = `${Math.round(response.data.main.temp)}`;
    document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)}`;
    document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}`;
    document.querySelector("#description").innerHTML = `${response.data.weather[0].description}`;
    document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
  }
}
document.querySelector("#current").addEventListener("click", currentCity);






search("New York");

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
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day}  ${hours}:${minutes}`;
}


      
    


function getForecast(coordinates) {
    console.log(coordinates); 
    apiKey = "360f33424340a0f95a8c619e705e8605";
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let days = ["thu", "fri", "sat"];
    days.forEach(function(day) {
    forecastHTML = forecastHTML + `
    
<div class="col-2">
    <div class="weather-forecast-date">${day}</div>
    <img src="https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png" alt="" width="42">
    <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">18°</span>
        <span class="weather-forecast-temperature-min">12°</span>
    </div>
    </div>

`;    
    })
    

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

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
    let apiKey = "360f33424340a0f95a8c619e705e8605";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}
//submit "search"
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input")
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
  let apiKey = "360f33424340a0f95a8c619e705e8605";
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






search("Glasgow");
displayForecast();
let currentDate = new Date(); //put it inside a function!
let day = currentDate.getDate(); //date of the month 1-31
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hour}:${minutes}`;

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[currentDate.getMonth()];
let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekDay = weekDays[currentDate.getDay()]; //Sunday - Saturday
let formattedDate = `${weekDay} ${day} ${month}, ${time}`;

let date = document.querySelector("#current-date");
date.innerHTML = formattedDate;

function showTemperature(response) {
  let temperature = response.data.main.temp;
  document.querySelector("#degrees").innerHTML = Math.round(temperature);
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let city = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  let windUnit = " m/s";
  let humidityUnit = " %";
  let pressureUnit = " hPa";
  document.querySelector("#current-city").innerHTML = city;
  document.querySelector("#wind-value").innerHTML = `${wind}${windUnit}`;
  document.querySelector(
    "#humidity-value"
  ).innerHTML = `${humidity}${humidityUnit}`;
  document.querySelector(
    "#pressure-value"
  ).innerHTML = `${pressure}${pressureUnit}`;
  celsiusTemp = response.data.main.temp; // can I use the variable temperature instead of response.data.main.temp?
}

function showForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);
  forecastElement.innerHTML = `
    <div class="col-2">
      <h4>12:00</h4>
      <img src="https://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png"/>
      <div class="forecast-temperature">
      <strong>${Math.round(forecast.main.temp_max)}℃</strong> ${Math.round(
    forecast.main.temp_min
  )}℃</div>
    </div>`;
}

function searchOnLoad(city) {
  let apiKey = "5c3ee28f0359086dde5610bde74e2870";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let fullUrl = `${apiUrl}${city}&units=metric&appid=${apiKey}`;
  axios.get(fullUrl).then(showTemperature);

  fullUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(fullUrl).then(showForecast);
}
function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchOnLoad(city);
}
let form = document.querySelector("#search-window");
form.addEventListener("submit", displayCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5c3ee28f0359086dde5610bde74e2870";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let fullUrl = `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(fullUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current-location-btn");
locationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#degrees");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let tempF = celsiusTemp * 1.8 + 32;
  temp.innerHTML = Math.round(tempF);
}

let celsiusTemp = null;

function convertToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#degrees");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temp.innerHTML = Math.round(celsiusTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

searchOnLoad("Oslo");

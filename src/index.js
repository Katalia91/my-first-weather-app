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
  let temperature = Math.round(response.data.main.temp);
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let city = response.data.name;
  let windUnit = " m/s";
  let humidityUnit = " %";
  let pressureUnit = " hPa";
  let heading = document.querySelector("#current-city");
  heading.innerHTML = city;
  let windSpeed = document.querySelector("#wind-value");
  windSpeed.innerHTML = `${wind}${windUnit}`;
  let humidityValue = document.querySelector("#humidity-value");
  humidityValue.innerHTML = `${humidity}${humidityUnit}`;
  let airPressure = document.querySelector("#pressure-value");
  airPressure.innerHTML = `${pressure}${pressureUnit}`;
  let currentTemp = document.querySelector("#degrees");
  currentTemp.innerHTML = temperature;
}
function searchOnLoad(city) {
  let apiKey = "5c3ee28f0359086dde5610bde74e2870";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let fullUrl = `${apiUrl}${city}&units=metric&appid=${apiKey}`;
  axios.get(fullUrl).then(showTemperature);
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

// Coming next

/* function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#degrees");
  let tempF = "temp" * 1.8 + 32;
  console.log(tempF);
}

*/
searchOnLoad("Oslo");

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday"
];
let currentDay = days[date.getDay()];
let currentHour = date.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let now = document.querySelector("#datetime");
now.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

function searchForm(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-input");

  let city = document.querySelector("#city");
  city.innerHTML = inputCity.value;
}

function celcius(event) {
  event.preventDefault();

  let convCelcius = document.querySelector("#temp");
  convCelcius.innerHTML = "20";
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}
let cityform = document.querySelector("#search-form");
cityform.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = `1466a6424c9ec99ab555226570dccc0a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempAssign = document.querySelector("#temp");
  tempAssign.innerHTML = temperature;
}

function searchCurrentLocation(position) {
  let apiKey = "1466a6424c9ec99ab555226570dccc0a";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", showCurrentLocation);

const APIKey = '887a16c992b277c741996e2c64385349';
const textBox = document.querySelector('#textBox');
const searchButton = document.querySelector('#search-button');
const cityList = document.querySelector('#city-list');
const cityInfo = document.querySelector('#city-info');
const cityNameEl = document.querySelector('#city-name');
const dateEl = document.querySelector('#date');
const iconEl = document.querySelector('.icon');
const tempEl = document.querySelector('.temp');
const windEl = document.querySelector('.wind');
const humidityEl = document.querySelector('.humidity');



function locationApi() {
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + textBox + "&appid=" + APIKey;


    // Forward Geocoding API Endpoint
    // var latLonAPI = 'https://api.openweathermap.org/data/2.5/weather?q=$' + textBox.value + '&appid=$' + APIKey;
    var latLonURL = `https://api.openweathermap.org/data/2.5/weather?q=${textBox.value}&units=imperial&appid=${APIKey}`;

    fetch(latLonURL)
    .then(function (response) { //turns into JavaScript object
        return response.json();
    })
    .then(function (data) {
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let cityName = data.name;
        let date = data.dt;
        let weatherCondition = data.weather[0].icon;
        let temp = data.main.temp;
        let wind = data.wind.speed;
        let humidity = data.main.humidity;
        
        weatherApi(lat, lon, cityName, date, weatherCondition, temp, wind, humidity);
        console.log(data);
    })

    // //if city they enter is not found
    // .catch(err => alert('404 Not Found'));

}

function weatherApi(lat, lon, cityName, date, weatherCondition, temp, wind, humidity) {

    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    fetch(weatherURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);
    cityNameEl.textContent = cityName;
    date = (new Date(date*1000)).toLocaleDateString('en-US');
    dateEl.textContent = date;
    tempEl.textContent = 'Temp: ' + temp + ' \u00B0F';
    windEl.textContent = 'Wind: ' + wind + ' MPH';
    humidityEl.textContent = 'Humidity: ' + humidity + ' %';
    iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${weatherCondition}@2x.png`);
    // iconEl.classList.remove('hide');

    })

}

let cityListLocal = [];
let citiesLocal;
let cityNames;
let eachCity;
let cityButton;
let cityButtonEl;

cityNames = Object.keys(localStorage);
listCities();

function search() {
    citiesLocal = localStorage.setItem(textBox.value, '');
    // textBox.value = ''; //resets the text in textbox

}

function listCities() {
    for (let i = 0; i < localStorage.length; i++) {
        cityListLocal[i] = cityNames[i];
        cityButton = document.createElement('button');
        cityButtonEl = cityList.appendChild(cityButton);
        cityButtonEl.textContent = cityListLocal[i];
   
   }
}





searchButton.addEventListener('click', search);
searchButton.addEventListener('click', locationApi);

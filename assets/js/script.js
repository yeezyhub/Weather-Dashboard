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
const forecastEl = document.querySelector('#forecast');
const buttonEl = document.querySelector('.button');
let cityChosen = textBox.value;

let cityListLocal = [];
let citiesLocal;
let cityNames;
let eachCity;
let cityButton;
let cityButtonEl;

function init() {
    textBox.value = 'Austin';
    cityList.textContent = '';
    locationApi();
    // search();
}



function kelvinToFahrenheit(kelvin) {
   let fahrenheit = 1.8 * (kelvin-273) + 32;
   fahrenheit = fahrenheit.toFixed(2);
   return fahrenheit;
}

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
    dateEl.textContent = '(' + date + ')';
    tempEl.textContent = 'Temp: ' + temp + ' \u00B0F';
    windEl.textContent = 'Wind: ' + wind + ' MPH';
    humidityEl.textContent = 'Humidity: ' + humidity + ' %';
    iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${weatherCondition}@2x.png`);
    iconEl.classList.remove('hide');
    cityInfo.classList.remove('hide');

for (let i = 0; i < data.list.length; i++) {
    let condition = data.list[i].dt_txt.includes("12:00:00");
        if (condition) {
            forecastEl.classList.remove('hide');
            console.log(data.list[i]);
            let forecastContainer = document.createElement('div');
            forecastContainer.classList.add("card")
            let forecastCard = `
            <div class="card-body">
              <h5 class="card-title">(${data.list[i].dt_txt})</h5>
              <img src='http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png' class="card-subtitle mb-2 text-muted"></img>
              <p class="card-text">Temp: ${kelvinToFahrenheit(data.list[i].main.temp)} \u00B0F</p>
              <p class="card-text">Wind: ${data.list[i].wind.speed} MPH</p>
              <p class="card-text">Humidity: ${data.list[i].main.humidity} %</p>
            </div>
            `;
            forecastContainer.innerHTML = forecastCard;
            forecastEl.appendChild(forecastContainer);
        }
}
    // let firstDay = data.list[1];
    // let secondDay = data.list[9];
    // let thirdDay = data.list[17];
    // let fourthDay = data.list[25];
    // let fifthDay = data.list[33];

    // console.log(firstDay);
    // console.log(secondDay);
    // console.log(thirdDay);
    // console.log(fourthDay);
    // console.log(fifthDay);

    // let firstDayIcon = firstDay.weather[0].icon;
    // let secondDayIcon =  secondDay.weather[0].icon;
    // let thirdDayIcon = thirdDay.weather[0].icon;
    // let fourthDayIcon = fourthDay.weather[0].icon;
    // let fifthDayIcon = fifthDay.weather[0].icon;


    // let firstDayTemp = kelvinToFahrenheit(firstDay.main.temp);
    // let secondDayTemp = kelvinToFahrenheit(secondDay.main.temp);
    // let thirdDayTemp = kelvinToFahrenheit(thirdDay.main.temp);
    // let fourthDayTemp = kelvinToFahrenheit(fourthDay.main.temp);
    // let fifthDayTemp = kelvinToFahrenheit(fifthDay.main.temp);

    // let firstDayWind = firstDay.wind.speed;
    // let secondDayWind = secondDay.wind.speed;
    // let thirdDayWind = thirdDay.wind.speed;
    // let fourthDayWind = fourthDay.wind.speed;
    // let fifthDayWind = fifthDay.wind.speed;

    // let firstDayHum = firstDay.main.humidity;
    // let secondDayHum = secondDay.main.humidity;
    // let thirdDayHum = thirdDay.main.humidity;
    // let fourthDayHum = fourthDay.main.humidity;
    // let fifthDayHum = fifthDay.main.humidity;
    })

}




function search() {
    citiesLocal = localStorage.setItem(textBox.value, '');
    cityList.textContent = '';
    listCities();
    // textBox.value = ''; //resets the text in textbox
}


function listCities() {
    cityNames = Object.keys(localStorage);
    
    for (let i = 0; i < localStorage.length; i++) {
        cityListLocal[i] = cityNames[i];
        cityButton = document.createElement('button');
        cityButtonEl = cityButton.classList.add('button');
        cityButton.onclick = function(){getButtonValue(this)};
        cityButtonEl = cityList.appendChild(cityButton);
        cityButtonEl.textContent = cityListLocal[i];        
   }   
//    buttonEl.onclick = function () { getButtonValue(this); };

}

init();

listCities();


function getButtonValue(value) {
    var buttonValue = value.innerHTML;
    console.log(buttonValue);
    locationApi(buttonValue);
}




searchButton.addEventListener('click', search);
searchButton.addEventListener('click', locationApi);


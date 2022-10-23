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
let forecastCard;

let isCitySelected = false;

function init() {
    textBox.value = 'Austin';
    cityList.textContent = '';
    locationApi();
}



function kelvinToFahrenheit(kelvin) {
   let fahrenheit = 1.8 * (kelvin-273) + 32;
   fahrenheit = fahrenheit.toFixed(2);
   return fahrenheit;
}

function locationApi() {

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
    
    if (isCitySelected) {
    }

    for (let i = 0; i < data.list.length; i++) {

        let condition = data.list[i].dt_txt.includes("12:00:00");
            if (condition) {
                forecastEl.classList.remove('hide');
                let forecastContainer = document.createElement('div');
                forecastContainer.classList.add("card");
                let dateSplit = data.list[i].dt_txt.split('');
                let dateFormat = dateSplit[5] + dateSplit[6] + '/' + dateSplit[8] + dateSplit[9] + '/' + dateSplit[0] + dateSplit[1] + dateSplit[2] + dateSplit[3];
                forecastCard = `
                <div class="card-body">
                <h6 class="card-title">(${dateFormat})</h6>
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

    
    }
    )
    

}

function search() {
    citiesLocal = localStorage.setItem(textBox.value, '');
    cityList.textContent = '';
    listCities();
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

}

init();
listCities();

function getButtonValue(value) {
    isCitySelected = true;
    var buttonValue = value.innerHTML;
    textBox.value = buttonValue;
    console.log(buttonValue);
    locationApi();
}


searchButton.addEventListener('click', search);
searchButton.addEventListener('click', locationApi);


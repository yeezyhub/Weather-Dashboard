const APIKey = '887a16c992b277c741996e2c64385349'; //API key from OpenWeather
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

//methods work with textBox.value based, to set something default created as global variable
let cityChosen = textBox.value;

let cityListLocal = [];
let citiesLocal;
let cityNames;
let eachCity;
let cityButton;
let cityButtonEl;
let forecastCard;

//to check if city is selected from the list, helps clearing the previous forecast data off the screen, first city is selected by default
let isCitySelected = true;

//first data is printed with this method
function init() {
    textBox.value = 'Austin';
    cityList.textContent = '';
    locationApi();
}

//Kelvin to Fahrenheit Converter
function kelvinToFahrenheit(kelvin) {
   let fahrenheit = 1.8 * (kelvin-273) + 32;
   fahrenheit = fahrenheit.toFixed(2);
   return fahrenheit;
}

//Using textBox.value, the method gets its values such as latitude and longitude and turn in as a parameter to weatherApi() method.
function locationApi() {

    //accesses the OpenWeather Api website to help getting response and data
    var latLonURL = `https://api.openweathermap.org/data/2.5/weather?q=${textBox.value}&units=imperial&appid=${APIKey}`;

    //fetch to get response and data
    fetch(latLonURL)
    .then(function (response) { //then turns into JavaScript object
        return response.json();
    })
    .then(function (data) { //then lists the data to be used
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let cityName = data.name;
        let date = data.dt;
        let weatherCondition = data.weather[0].icon;
        let temp = data.main.temp;
        let wind = data.wind.speed;
        let humidity = data.main.humidity;
        
        //all the data needed passed into weatherApi() method with parameters.
        weatherApi(lat, lon, cityName, date, weatherCondition, temp, wind, humidity);
        console.log(data);
    })

    // //if city they enter is not found
    // .catch(err => alert('404 Not Found'));

}

//Using latitude and longitude data, the weather conditions are accessed using this method.
function weatherApi(lat, lon, cityName, date, weatherCondition, temp, wind, humidity) {

    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    //fetch to get response and data
    fetch(weatherURL)
        .then(function (response) { //then turns into JavaScript object
            return response.json();
        })
        .then(function (data) { //then lists the data to be used
            console.log(data);
            cityNameEl.textContent = cityName;
            date = (new Date(date*1000)).toLocaleDateString('en-US'); //date is accessed and formatted
            dateEl.textContent = '(' + date + ')'; //adding parentheses to the formatting
            tempEl.textContent = 'Temp: ' + temp + ' \u00B0F'; //Temperature
            windEl.textContent = 'Wind: ' + wind + ' MPH'; //Wind
            humidityEl.textContent = 'Humidity: ' + humidity + ' %'; //Humidity
            iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${weatherCondition}@2x.png`); //Weather Icons
            iconEl.classList.remove('hide');
            cityInfo.classList.remove('hide');
    
            //When a city is selected from the list, clears the previous forecast data
            if (isCitySelected) {
            forecastEl.replaceChildren();
            let forecastText = document.createElement('h4');
            forecastEl.appendChild(forecastText);
            forecastText.textContent = '5-Day Forecast: '
            }

            //Using loop, the cards generated and data is placed into 5-day forecast section
            for (let i = 0; i < data.list.length; i++) {

                let condition = data.list[i].dt_txt.includes("12:00:00"); //time selection of the forecast data
                if (condition) { //checks if the time selected is matching with data array elements to print on the page
                    forecastEl.classList.remove('hide');
                    let forecastContainer = document.createElement('div'); 
                    forecastContainer.classList.add("card"); 
                    let dateSplit = data.list[i].dt_txt.split(''); //splits date into letters
                    let dateFormat = dateSplit[5] + dateSplit[6] + '/' + dateSplit[8] + dateSplit[9] + '/' + dateSplit[0] + dateSplit[1] + dateSplit[2] + dateSplit[3];
                    //Card creation using BootStrap
                    forecastCard = `
                    <div class="card-body">
                    <h6 class="card-title">(${dateFormat})</h6>
                    <img src='http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png' class=""></img>
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

//sets textBox.value items to the localStorage.
function search() {
    citiesLocal = localStorage.setItem(textBox.value, '');
    cityList.textContent = '';
    listCities();
}

//gets from localStorage and create buttons for corresponding cities
function listCities() {
    cityNames = Object.keys(localStorage);
    
    //buttons are created dynamically and class 'button' are added dynamically
    for (let i = 0; i < localStorage.length; i++) {
        cityListLocal[i] = cityNames[i];
        cityButton = document.createElement('button');
        cityButtonEl = cityButton.classList.add('button');
        cityButton.onclick = function(){getButtonValue(this)}; //runs the locationApi(), if city is clicked
        cityButtonEl = cityList.appendChild(cityButton);
        cityButtonEl.textContent = cityListLocal[i];        
   }   

}

init();
listCities();

//After click, gets the value of button and runs locationApi() to get the current weather and forecast data
function getButtonValue(value) {
    isCitySelected = true;
    var buttonValue = value.innerHTML;
    textBox.value = buttonValue;
    console.log(buttonValue);
    locationApi();
}

//Event Listeners
searchButton.addEventListener('click', search);
searchButton.addEventListener('click', locationApi);


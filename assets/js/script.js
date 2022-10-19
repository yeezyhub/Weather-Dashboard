let APIKey = '887a16c992b277c741996e2c64385349';
let textBox = document.querySelector('#textBox');
let searchButton = document.querySelector('#search-button');
let cityList = document.querySelector('#city-list');


function locationApi() {
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + textBox + "&appid=" + APIKey;


    // Forward Geocoding API Endpoint
    // var latLonAPI = 'https://api.openweathermap.org/data/2.5/weather?q=$' + textBox.value + '&appid=$' + APIKey;
    var latLonURL = `https://api.openweathermap.org/data/2.5/weather?q=${textBox.value}&units=imperial&appid=${APIKey}`;


    fetch(latLonURL)
    .then(function (response) {
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        weatherApi(lat, lon);
        return response.json();

    })
    .then(function (data) {
        console.log(data);
    })

    // //if city they enter is not found
    // .catch(err => alert('404 Not Found'));

}

function weatherApi(lat, lon) {

    var weatherURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    fetch(weatherURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);
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

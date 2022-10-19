let APIKey = '887a16c992b277c741996e2c64385349';
let textBox = document.querySelector('#textBox');
let searchButton = document.querySelector('#search-button');
let cityList = document.querySelector('#city-list');
let lat, lon;


function getApi() {
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + textBox + "&appid=" + APIKey;


    // Forward Geocoding API Endpoint
    // var latLonAPI = 'https://api.openweathermap.org/data/2.5/weather?q=$' + textBox.value + '&appid=$' + APIKey;
    var latLonAPI = `https://api.openweathermap.org/data/2.5/weather?q=${textBox.value}&units=imperial&appid=${APIKey}`;


    fetch(latLonAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

    // var queryURL = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;

    // fetch(queryURL)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //     })
}
// fetch(queryURL)

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
searchButton.addEventListener('click', getApi);

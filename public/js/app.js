var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const windElement = document.querySelector('.windSpeed');
const windIcon = document.querySelector('.windIcon i');

const humidityElement = document.querySelector('.humidity');
const humidityIcon = document.querySelector('.humidityIcon i');

const dateElement = document.querySelector('.date');


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    windElement.textContent = "";
    humidityElement.textContent = "";

    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = "Error while finding city";
                tempElement.textContent = "";
                weatherCondition.textContent = "";
                windElement.textContent = "";
                humidityElement.textContent = "";

            } else {

                if(data.description === "rain" || data.description === "fog" || data.description === "sunny" 
                || data.description === "hail"|| data.description === "sleet"|| data.description === "cloudy-high" 
                || data.description === "thunderstorm" || data.description === "storm" || data.description === "sprinkle" 
                || data.description === "rain-wind" || data.description === "eclipse" || data.description === "hot"
                || data.description === "sunny-overcast" || data.description === "showers" || data.description === "lightning"){

                    weatherIcon.className = "wi wi-day-" + data.description
                } else if(data.description === "broken clouds"){
                    weatherIcon.className = "wi-night-storm-showers"
                }
                 else if(data.description === "clear sky"){
                weatherIcon.className = "wi-day-sunny"
                }   
                else if(data.description === "mist"){
                    weatherIcon.className = "wi-fog"
                } 
                else if(data.description === "light rain"){
                    weatherIcon.className = "wi-rain"
                }   
                else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
                windElement.textContent = data.windSpeed;
                windIcon.className = "wi-strong-wind";
                humidityElement.textContent = data.humidity;
                humidityIcon.className = "wi-humidity";


            }
        }) 
    });
})


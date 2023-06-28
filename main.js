const API_KEY = ""

async function getResponse (cityName) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=4&aqi=no&alerts=no`)
    let weatherData = await response.json()
    return weatherData
}

function setWeather(weatherData){
    let list = document.querySelector(".weather")
    
    let forecast = ""
    for (let day =0; day < weatherData.forecast.forecastday.length; day++){  
        forecastday = weatherData.forecast.forecastday[day]
        date = forecastday.date
        temp = forecastday.day.maxtemp_c
        condition = forecastday.day.condition.text
        conditionIcon = forecastday.day.condition.icon
    
        forecast += ` <li class="today-temp">
        <div class="date">${date}</div>
        <div class="temp">${temp}°C</div>
        <div class="condition">${condition}</div>
        <img src="https:${conditionIcon}" class="condition-icon"></li>`
    }
    list.innerHTML = forecast
}

async function onButtonClick(event){
    event.preventDefault()
    let cityName = document.getElementsByName("city-input")[0].value
    let weatherData = await getResponse(cityName)
    setWeather(weatherData)
}

function main() {
    let weatherButton = document.getElementsByName("city-button")[0]
    weatherButton.addEventListener("click", onButtonClick)
}
document.addEventListener("DOMContentLoaded", main)
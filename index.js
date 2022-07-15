// Your code here

const appContainer = document.getElementById('weather-app')
const section = document.getElementById('weather')
const form = document.querySelector('form')
var input = document.querySelector('input')

async function getWeather() {
    try {
        let usersInput = input.value
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${usersInput}&APPID=be6e551f0c4cd055ab2da7f347c9e25c`)
        const weather = await res.json()
        renderWeather(weather)
        usersInput = ""
    } catch(err) {
        const h2 = document.createElement('h2')
        h2.textContent = "Location not found"
        section.appendChild(h2)
    }
}

form.onsubmit = e => {
    e.preventDefault()
    getWeather()
}


const renderWeather = weather => {
    section.innerHTML = ""

    const br = document.createElement('br')

    const h2 = document.createElement('h2')
    const city = weather.name
    const country = weather.sys.country
    h2.textContent = `${city}, ${country}`
    h2.classList.add('weather_name')
    section.appendChild(h2)

    const map = document.createElement('a')
    const lat = weather.coord.lat
    const long = weather.coord.lon
    map.href = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
    map.target = "__BLANK"
    map.textContent = "Click to view map"
    map.classList.add('map')
    section.appendChild(map)

    const image = document.createElement('img')
    const icon = weather.weather[0].icon
    image.src = `https://openweathermap.org/img/wn/${icon}.png`
    image.classList.add('icon')
    section.appendChild(image)

    const weatherTxt = document.createElement('p')
    weatherTxt.textContent = weather.weather[0].description
    weatherTxt.style.textTransform = "capitalize"
    weatherTxt.classList.add('description')
    section.appendChild(weatherTxt)
    section.appendChild(br)

    const currentTemp = document.createElement('p')
    currentTemp.textContent = `Current: ${weather.main.temp} \xB0F`
    currentTemp.classList.add('current_temp')
    section.appendChild(currentTemp)


    const feelsLike = document.createElement('p')
    feelsLikeTemp = weather.main.feels_like
    feelsLike.textContent = `Feels like: ${feelsLikeTemp}\xB0F`
    feelsLike.classList.add('feels_like')
    section.appendChild(feelsLike)
    section.appendChild(br)


    const lastUpdated = document.createElement('p')
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    lastUpdated.textContent = `Last updated: ${time}`
    lastUpdated.classList.add('last_updated')
    section.appendChild(lastUpdated)
}
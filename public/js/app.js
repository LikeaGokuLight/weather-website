/*
fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then( (data) => {
        console.log(data)
    } )
} )
*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch(`/weather/?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Try again!'
                messageTwo.textContent = data.error
            } else {
                const forecast = data.forecast
                const country = forecast.country
                const latitude = forecast.latitude
                const longitude = forecast.longitude
                const local_time = forecast.local_time
                const name = forecast.name
                const region = forecast.region
                const temperature = forecast.temperature
                const wind_speed = forecast.wind_speed
                const wind_degree = forecast.wind_degree
                const wind_direction = forecast.wind_direction
                const humidity = forecast.humidity
                const feelslike = forecast.feelslike
                const is_day = forecast.is_day




                const today = `
                    The temperature in ${name}
                    is ${temperature} the country is ${country}
                    is situated latitude ${latitude} 
                    longitude is ${longitude}
                    the current time is ${local_time} 
                    in the region ${region}
                    the wind speed is ${wind_speed} and
                    wind degree ${wind_degree}
                    wind direction is ${wind_direction}
                    humidity is ${humidity}
                    the temperature outside is feels like ${feelslike}
                    now is ${is_day}
                    `


                messageOne.textContent = data.place_name
                messageTwo.textContent = today
                console.log(forecast.is_day)
            }
        })
    })
})






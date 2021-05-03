/*
fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then( (data) => {
        console.log(data)
    } )
} )
*/
console.log('lesson git ')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch(`http://localhost:3000/weather/?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Try again!'
                messageTwo.textContent = data.error
                console.log(data.error)
            } else {
                const forecast = data.forecast
                const country = forecast.country
                const latitude = forecast.latitude
                const longitude = forecast.longitude
                const local_time = forecast.local_time
                const name = forecast.name
                const region = forecast.region
                const temperature = forecast.temperature
                const weather_cloud = forecast.weather_cloud
                const today = `
                    The temperature in ${name}
                    is ${temperature} the country is ${country}
                    is situated latitude ${latitude} 
                    longitude is ${longitude}
                    the current time is ${local_time} 
                    in the region ${region} is ${weather_cloud}
                    `
                messageOne.textContent = data.place_name
                messageTwo.textContent = today
            }
        })
    })
})






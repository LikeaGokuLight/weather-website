const request = require('postman-request')

const forecast = (latitude, longitude, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=7951993d95bcc6e19fbd1705e5332d63&query=${latitude},${longitude}`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather.com services', undefined)
        } else if (body.error) {
            callback('Please specify a valid location')
        } else {
            callback(undefined, {
                // LOCATION
                name: body.location.name,
                country: body.location.country,
                region: body.location.region,
                latitude: body.location.lat,
                longitude: body.location.lon,
                local_time: body.location.localtime,
                // CURRENT
                temperature: body.current.temperature,
                weather_cloud: body.current.weather_descriptions[0],
                wind_speed: body.current.wind_speed,
                wind_degree: body.current.wind_degree,
                wind_direction: body.current.wind_dir,
                humidity: body.current.humidity,
                feelslike: body.current.feelslike,
                is_day: body.current.is_day
            })
        }
    })
}

module.exports = forecast
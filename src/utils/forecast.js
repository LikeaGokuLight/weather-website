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
                name: body.location.name,
                country: body.location.country,
                region: body.location.region,
                latitude: body.location.lat,
                longitude: body.location.lon,
                local_time: body.location.localtime,
                temperature: body.current.temperature,
                weather_cloud: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast
const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2lsbGFraWxsOTUiLCJhIjoiY2tvNHA5dzd0MTMwdzJ2czJoaDh0ZW00MSJ9.RPRh1wbm2YuwZGCX4yY9ng&limit=1`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Error Server')
        } else if (body.features.length === 0) {
            callback('Please specify a valid location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                place_name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
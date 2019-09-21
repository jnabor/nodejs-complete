const request = require('request')
const cfg = require('./cfg.js')

const forecast = (latitude, longitude, callback) => {
    
    const url = `https://api.darksky.net/forecast/${cfg.darkSkyApiKey}/${latitude},${longitude}`

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', udefined)
        } else if (body.error){
            callback('Unable to find location!', udefined)
        } else {
            callback(undefined, body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degrees out. There is a ' +  body.currently.precipProbability + '% chance of rain.')
        }
    })

}

module.exports = forecast
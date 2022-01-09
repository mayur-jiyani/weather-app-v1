const request = require("request");



const forecast = (lan, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=53fb62b8da49bfc1d856bc6c2c8f04a5&query=' + lan + ',' + long + 'long&units = m';

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect weather service', undefined)
        } else if (body.error) {
            callback("unable to find location", undefined)
        } else {
            callback(undefined, 'Todays temperature is ' + body.current.temperature + ' degree' + ' and it is ' + body.current.weather_descriptions)
        }
    })
}

module.exports = forecast
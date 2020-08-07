var request = require('postman-request')
var chalk = require('chalk')
const geocode = require('./geocode')


// Forecast
const forecast = function({ latitude, longitude, location }, callback) {

    const url = `http://api.weatherstack.com/current?access_key=be91c28a11bc78a21f3ef6b2d02a6fcd&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, {body}) => {    
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback(chalk.red('Oops. Unable to find location.'), undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                precip: body.current.precip,
                location
            })            
        }
    })// weather request
    
}//forecast()

module.exports = forecast
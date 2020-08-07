var request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGpjcmVhZGV2IiwiYSI6ImNrM3l6cGV2dzFxNjIzbG8xNzczNHE0bDUifQ.lBuGo5gAxzopcf2i_Zt4Vg`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Error: Unable to connect to location services.', undefined)
        } else if (body.features.length < 1) {
            callback({error: 'Error: Unable to find that location.'}, undefined)
        } else {
            callback(undefined, {                
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1], 
                location: body.features[0].place_name
            })
        }
    })
}//geocode()

module.exports = geocode
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Assign public directory path
const __public = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Set handlebars(hbs) as view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static directory to be public directory path
app.use(express.static(__public))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Timothy J Stephens'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'Timothy J Stephens'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'Timothy J Stephens'
    })
})


// Weather App API Page
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Error: You must provide an address."
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send(error)
        }    
        forecast(data, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
           return res.send({
               forecast: `It is currently ${forecastData.temperature} degrees out at ${forecastData.location}. There is a ${forecastData.precip}% chance of rain.`,
               temperature: forecastData.temperature,
               precip: forecastData.precip,
               location: forecastData.location,
               address: req.query.address
           })
        }) //forecast
    })//geocode

})// app.get /weather



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })        
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Hmm. We could not find that help article.',
        author: 'Timothy J Stephens'
    })
})

// 404 Page
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Hmm. We could not find that page.',
        author: 'Timothy J Stephens'
    })
})




// Start expres server
app.listen(3000, () => {
  console.log('Server is up on port 3000.')  
})
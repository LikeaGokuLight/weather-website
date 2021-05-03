const path =  require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
// utils
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths fom Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App!',
        name: 'Vitali',
        age: 26
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is About Us page!',
        name: 'Vitali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Here is Help page!',
        name: 'Vitali',
        made : 'Made with Heart'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('You must provide a valid address')
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name} = {} ) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                place_name,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: [ ]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found 404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found 404.'
    })
})

app.listen(3000, () => {
    console.log(chalk.green.bgGreen.bold('Server is up on port 3000'))
})
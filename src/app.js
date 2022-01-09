const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoCoding = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'mayur jiyani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'mayur jiyani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'mayur jiyani',
        title: 'Help page',
        helpText: "Can I help u"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide search term"
        })
    }

    geoCoding(req.query.address, (error, { latitude, longitude, placename } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location: placename,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     forecast: "it is snowing",
    //     location: "Surat",
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help article not found',
        title: '404',
        name: 'mayur jiyani'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        msg: 'Page not found',
        title: '404',
        name: 'mayur jiyani'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express();

const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const viewPartials = path.join(__dirname, '../templates/partials')

// setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(viewPartials);

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',  {
        title: "Home Page",
        name: "Suraj Kumar"
    });
})

app.get('/about', (req, res) => {
    res.render('about',  {
        title: "About Page",
        name: "Suraj Kumar"
    });
})

app.get('/help', (req, res) => {
    res.render('help',  {
        title: "Help Page",
        message: "this is message",
        name: "Suraj Kumar"
    });
})

app.get('/weather', (req, res) => {
    let address = req.query.address;
    
    if(address) {
        return res.send({
            forcast: "forecastData here",
            location: 'location here',
            address: req.query.address
        })
    }
    res.send({
        error: 'no address provided',
    })

})

/* app.get('/product', (req, res) => {
    if(!req.query.search) {

        return res.send("search term not provided."); 
        // using return to avoid error in console 
        //"Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client". 
        // As script continue to executed after res.send if return is not used 
    }

    res.send({
        address:req.query.search
    });
}) */

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Suraj Kumar',
        message: ' help page 404',
        title: 'Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Suraj Kumar',
        title: 'Page Not Found',
        message: 'page 404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
});
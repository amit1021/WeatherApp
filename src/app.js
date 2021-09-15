const { clear } = require('console');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const weatherData = require('../utils/wheatherData');

const port = process.env.PORT || 3005
//contains the path until public
const publicStaticDirPath = path.join(__dirname, '../public')

//contains the path until templates

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather In The World',
    });
})

app.get('/weather',(req, res) =>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "Must enter address"
        })
    }
    weatherData(address, (error, {temperature, description, cityName, windSpeed,humidity }) =>{
        if(error){
            return res.send({
                    error
            })
        }
        res.send({
            temperature, 
            description, 
            cityName, 
            windSpeed,
            humidity
        })
    });

})

app.get('*',(req, res) =>{
    res.render('404',{
        title: "Page not found"
    })
})


app.listen(port, ()=>{
    console.log("Is up ", port);
})
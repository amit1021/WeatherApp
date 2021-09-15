const request = require('request');
const constans = require('../config');

const weatherData = (address, callback) => {
    const url = constans.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constans.openWeatherMap.KEY;
    request({url, json: true},(error, {body}) => {
        if(error){
            callback("Data not exist in open weather map api", error);
        }else {
            if ( body.message == 'bad query') {
                error = new Error ("Data not exist in open weather map api", error); 
                callback(error , {
                    temperature: null,
                    description: null,
                    cityName: null,
                    windSpeed: null,
                    humidity: null,
                })
            }else{
                console.log("get data")
                callback(undefined, {
                    temperature: body.list[0].main.temp,
                    description: body.list[0].weather[0].description,
                    cityName: body.list[0].name,
                    windSpeed: body.list[0].wind.speed,
                    humidity: body.list[0].main.humidity,
                })
            }
            
        }
    })
}

module.exports = weatherData;
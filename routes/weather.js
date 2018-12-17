var express = require('express');
var router = express.Router();
const request = require('request');
/* GET users listing. */


router.get('/', function(req, res, next) {

    //GET city form input
    let city = req.query.city;
    //define api key
    const apikey = '';
    //define the https request to the api with data and use the metric system
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apikey + '&units=metric';

    //request the request
    request(url, function(error, response, body) {

       try {


           let data = JSON.parse(body);
           let cod = data.cod;

           if(cod === '404'){
               res.render('index', {error: true});
           }


           //Collect all data necessary for app
           let temp_min = Math.round(data.main.temp_min);
           let temp_max = Math.round(data.main.temp_max);
           let temp = Math.round(data.main.temp);
           let city = data.name;
           let country = data.sys.country;
           let weatherid = data.weather[0].id;
           let windspeed = data.wind.speed * 1.94384449;
           let winddirection = data.wind.deg;



           if(windspeed < 1){
               benaming = 'Windstil';
           }
           else if(windspeed >= 1 && windspeed <7){
               benaming = 'Zwakke wind';
           }
           else if(windspeed >= 7 && windspeed <17){
               benaming = 'Matige wind';
           }

           else if(windspeed >= 17 && windspeed <22){
               benaming = 'Vrij krachtige wind';
           }
           else if(windspeed >= 22 && windspeed <28){
               benaming = 'Krachtige wind';
           }
           else if(windspeed >= 28 && windspeed <34){
               benaming = 'Harde wind';
           }
           else if(windspeed >= 34 && windspeed <41){
               benaming = 'Stormachtige wind';
           }
           else if(windspeed >= 41 && windspeed <48){
               benaming = 'Storm';
           }
           else if(windspeed >= 48 && windspeed <56){
               benaming = 'Zware storm';
           }
           else if(windspeed >= 56 && windspeed <= 63){
               benaming = 'Zeer zware storm';
           }
           else if(windspeed > 63 ){
               benaming = 'Orkaan';
           }




               res.render('weather', {
                   //use data with variables
                   city: city,
                   country: country,
                   temp: temp,
                   temp_min: temp_min,
                   temp_max: temp_max,
                   id: weatherid,
                   //round the windspeed to 1 decimal
                   windspeed: windspeed.toFixed(1),
                   winddirection: winddirection,
                   benaming: benaming
               });
       }

catch{
    res.render('index', {error: true});
        }



    });
});

module.exports = router;


const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, response) {
  response.sendFile(__dirname+"/index.html");
});

app.post("/",function(request,response){
  const query = request.body.cityName;
  const apiKey = "a0c2098ff90b230ecb85ef1554b02d03";
  const units = "imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+units;
  https.get(url, function(res) {
      console.log(res.statusCode);

      res.on('data', function(data) {
        const weatherData = JSON.parse(data);
        console.log(weatherData);

        const temp = weatherData.main.temp;
        const des = weatherData.weather[0].description;
        const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
        response.write("<h1>The temprature in "+ query +" is "+temp+"</h1>")
        response.write("<p>The weather is currently "+des+"</p> ");
        response.write('<img src = "'+ icon +'" alt="">');
        response.send();
      });

    });
});

app.listen(3000, function() {
  console.log("Server is on port 3000");
});

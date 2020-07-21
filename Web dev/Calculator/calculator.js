const express  = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response){
  response.sendFile(__dirname + "/index.html");
});
app.get('/bmicalculator', function(request, response){
  response.sendFile(__dirname + "/bmicalculator.html");
});

app.post('/', function(request, response){
  var num1 = Number(request.body.num1);
  var num2 = Number(request.body.num2);
  var result= num1+num2;

  response.send("The result is : "+result);
});

app.post('/bmicalculator', function(request, response){
  var h = Number(request.body.Height);
  var w = Number(request.body.Weight);
  var bmi= 703*(w/Math.pow(h,2));

  response.send("Your BMI is : "+bmi);
});

app.listen(3000, function(){
  console.log("Server running on port 3000");
});

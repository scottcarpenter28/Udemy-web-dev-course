const express = require("express");
const app = express();

app.get("/", function(request, response){
  response.send("<h1>Hello World!</h1>");
});

app.get("/contact", function(request, response){
  response.send("contact me here at: alskdjfla");
});

app.get("/about", function(request, response){
  response.send("I am Scott. I am a field enginer looking to enter a fullstack developer job.");
});

app.get("/random", function(request, response){
  response.send("This is a random page testing things");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});

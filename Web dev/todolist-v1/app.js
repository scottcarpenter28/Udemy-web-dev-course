//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
console.log(date);

const items = [];
const workItems = []
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("Public"));

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

app.get("/work", function(req, res) {
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post('/', function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push();
    res.redirect('/');
  }
});


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});


// var curDay = today.getDay();
// var day = "";

// switch (curDay) {
//   case 0:
//     day = "Sunday";
//     break;
//   case 1:
//     day = "Monday";
//     break;
//   case 2:
//      day = "Tuesday";
//     break;
//   case 3:
//     day = "Wednesday";
//     break;
//   case 4:
//     day = "Thursday";
//     break;
//   case 5:
//     day = "Friday";
//     break;
//   case 6:
//     day = "Saturday";
//     default:
//       console.log("Error: Curent da");

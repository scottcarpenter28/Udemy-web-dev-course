//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname +"/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("Public"));

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
}

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema)

const task1 = new Item({name: "Water plants"});
const task2 = new Item({name: "Make Lunch"});
const task3 = new Item({name: "Defrost turkey"});

const defaultItems = [task1, task2, task3]


app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems){
    if(foundItems.length == 0){
      Item.insertMany(defaultItems, function(err){
        if(err)
          console.log(err);
        else
          console.log("Success")
      });
      res.redirect("/")
    }
    else
      res.render('list', {listTitle: "Today", newListItems: foundItems});
  })
});

const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  const list = new List({
    name: customListName,
    items: defaultItems
  });

  List.findOne({name: customListName}, function(err, results){
    if(err)
      console.log(err)
    else if(!results){
      // Create the new list
      list.save();
      res.redirect("/"+customListName)
    }
    else{
      // Show the existing list
      res.render('list', {listTitle: customListName, newListItems: results.items})
    }
  })
});

app.post('/', function(req, res) {
  let itemName = req.body.newItem;
  let listName = req.body.list;

  let newItem = new Item({name: itemName});
  if(listName === "Today"){
    newItem.save(function(err){
      if(err)
      console.log(err);
      else
      res.redirect("/")
    });
  }
  else{
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/"+listName)
    });
  }

});

app.post("/delete", function(req, res){
  let itemId = req.body.checkbox;
  let listName = req.body.listName;

  if(listName ==="Today"){
    Item.findByIdAndRemove(itemId, function(err){
      if(err)
      console.log(err)
      else{
        res.redirect("/");
      }
    });
  }
  else{
    List.findOneAndUpdate(
      {name: listName},
      {$pull:{items: {_id: itemId}}},
      function(err,foundList){
        if(!err){
          res.redirect("/"+listName)
        }
      }
    );
  }

})


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});

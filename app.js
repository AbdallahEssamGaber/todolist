const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistDB");

// const newTasks = ["Plan", "Study", "Eat Food"];
// const workT asks= [];

const itemsSchema = {
  name: String
};

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const Item = mongoose.model("Item", itemsSchema);
const ItemArchive = mongoose.model("itemsArchive", itemsSchema);
const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit + in order to add a new item."
});

const item3 = new Item({
  name: "welcome again!"
});

const defaultItems = [item1, item2, item3];

var deleteItemName = "";




app.get("/",function(req, res){

  Item.find({}, function(err, found){
    if(found.length === 0){
      Item.insertMany(defaultItems,function(err){
        if(err) console.log(err);
        else console.log("Success");
      });
      res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newTasks: found, route: "/"});
    }
  })


});


app.get("/archive", function(req, res){
  ItemArchive.find({}, function(err, found){
    if(err) console.log(err);
    else res.render("list", {listTitle: "Archive", newTasks: found, route: "/archive"});
  });

});


app.post("/", function(req, res){

  const newTask = req.body.newTask;
  const listName = req.body.list;
  const item = new Item({
    name: newTask
  })

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save()
      res.redirect("/"+listName)
    });
  }


});


app.post("/delete", function(req, res){
  const idChecked = req.body.deleteCheckbox;
  Item.findById(idChecked, function(err, deltedItem){
    deleteItemName = deltedItem.name;
    const itemDelted = new ItemArchive({
      name: deleteItemName
    });
    itemDelted.save();

  });


  Item.findByIdAndRemove(idChecked, function(err){
    if(err){
      console.log(err);
    }

    else{
          console.log("item " + idChecked + "got deleted");
          res.redirect("/");
    }

  });

});


app.post("/restore", function(req, res){
  const idUnChecked = req.body.restoreCheckbox;
  ItemArchive.findById(idUnChecked, function(err, restoreItem){
    restoreItemName = restoreItem.name;
    const itemRestored = new Item({
      name: restoreItemName
    });
    itemRestored.save();
  });


  ItemArchive.findByIdAndRemove(idUnChecked, function(err){
    if(err){
      console.log(err);
    }

    else{
          console.log("item " + idUnChecked + "got deleted");
          res.redirect("/archive");
    }

  });
});

app.get("/:customRoute", function(req, res){
  const customListName = req.params.customRoute;

  List.findOne({name: customListName}, function(err, foundList){

    if(err) console.log(err);
    else {
      if(!foundList){
        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();
        res.redirect("/"+customListName)
      }
      else{
        res.render("list", {listTitle: customListName, newTasks: foundList.items, route: "/"+customListName})
      }
    }

  });


})


app.listen(process.env.PORT || 3000, function(){
  console.log("server running w kda");
})

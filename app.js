const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose = require("mongoose");
const _ = require("lodash");
mongoose.connect("mongodb://localhost:27017/todolistDB");

// const newTasks = ["Plan", "Study", "Eat Food"];
// const workT asks= [];

const itemsSchema = {
  name: String
};

const archiveSchema = {
  name: String,
  fromListName: String
}

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const Item = mongoose.model("Item", itemsSchema);
const ItemArchive = mongoose.model("itemsArchive", archiveSchema);
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
      foundList.save();
      res.redirect("/"+listName);
    });
  }


});


app.post("/delete", function(req, res){
  const idChecked = req.body.deleteCheckbox;
  const listName = req.body.listName;
  const itemNameD = req.body.itemName;
  if(listName === "Today"){
    Item.findById(idChecked, function(err, deltedItem){
      deleteItemName = deltedItem.name;
      const itemDelted = new ItemArchive({
        name: deleteItemName,
        fromListName: listName
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


  }
  else {
    const itemDelted = new ItemArchive({
      name: itemNameD,
      fromListName: listName
    });
    itemDelted.save();



    List.findOneAndUpdate({name: listName}, {$pull: {items:{_id: idChecked}}}, function(err, found){
      if(err)  console.log(err);
      else  res.redirect("/" + listName);
    });
  }




});


app.post("/restore", function(req, res){
  const idUnChecked = req.body.restoreCheckbox;

  ItemArchive.findById(idUnChecked, function(err, foundItem){
    const listNameDeleted = foundItem.fromListName;
    const itemRestored = new Item({
      name: foundItem.name
    });

    if(listNameDeleted === "Today"){
      itemRestored.push();
    } else {
      List.findOne({name: listNameDeleted}, function(err, foundList){
        foundList.items.push(itemRestored);
        foundList.save();
      });
    }

  });





  ItemArchive.findByIdAndRemove(idUnChecked, function(err){
    if(err){
      console.log(err);
    }

    else{
          res.redirect("/archive");
    }

  });
});

app.get("/:customRoute", function(req, res){
  const customListName = _.capitalize(req.params.customRoute);

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

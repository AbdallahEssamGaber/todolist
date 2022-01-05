const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const newTasks = ["Plan", "Study", "Eat Food"];
const workTasks = [];



app.get("/",function(req, res){


  res.render("list", {listTitle: date.getDate(), newTasks: newTasks});


});

app.post("/", function(req, res){

  newTask = req.body.newTask;


  if(req.body.list === "Work"){
    workTasks.push(newTask);
    res.redirect("/work");
    return;
  }


  newTasks.push(newTask);
  res.redirect("/")
});


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newTasks: workTasks});
});


app.listen(process.env.PORT || 3000, function(){
  console.log("server running w kda");
})

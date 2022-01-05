const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var newTasks = ["Plan", "Study", "Eat Food"];

app.get("/",function(req, res){



  var today = new Date();
  var currentDay = today.getDay()
  var options = {
    weekday: "long",
    day: 'numeric',
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options)

  res.render("list", {thatDay: day, newTasks: newTasks});


});

app.post("/", function(req, res){
  newTask = req.body.newTask;
  newTasks.push(newTask);
  res.redirect("/")
});


app.listen(3000, function(){
  console.log("server running w kda");
})

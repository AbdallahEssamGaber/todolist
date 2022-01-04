const express = require("express");
const bodyParser = require("body-parser");
const randomMovieNames = require('movies-names');


const app = express();

app.set("view engine", "ejs");

app.get("/",function(req, res){

  var movie = randomMovieNames.random().title;


  var today = new Date();
  var currentDay = today.getDay()
  var day = "";
  if(currentDay == 1){
    day = "Mo"
  }else{
    day = "fokak"
  }
  res.render("list", {thatDay: day, mvName: movie});


});


app.listen(3000, function(){
  console.log("server running w kda");
})

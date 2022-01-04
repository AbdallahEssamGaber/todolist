const express = require("express");
const bodyParser = require("body-parser");
const randomMovieNames = require('random-movie-names');


const app = express();

app.set("view engine", "ejs");

app.get("/",function(req, res){


  var movie = randomMovieNames({exactly: 1, wordsPerString: 1});
  var basicBasic = movie;
  movie = movie[0].replace(/([A-Z])/g, ' $1').trim();
  var  movieBasic = movie;
  // movie = "Beef I V B";
  // movie = "C K Shameles"

  //movie="U Y H Whats Up";
  // console.log(movie.charAt(0));
  /*
  1.


  */
  for(var i = 0; i <= movie.length; i++){


    if(movie.charAt(i) !== " " && movie.charAt(i) === movie.charAt(i).toUpperCase() && movie.charAt(i+1) === " " && movie.charAt(i+2) === movie.charAt(i+2).toUpperCase() && movie.charAt(i+3) == " " && movie.charAt(i+4) == movie.charAt(i+4).toUpperCase() && movie.length == i+5){

      var anotherArray = [];
      var splittedArray = movie.split("");
      movie = []
      var char = splittedArray.splice(0,i);
      movie.push(char);
      var char = splittedArray.splice(0,1);
      splittedArray.shift()
      movie.push(char);
      var char = splittedArray.splice(0,1);
      splittedArray.shift()
      movie.push(char);
      var char = splittedArray.splice(0,1);
      movie.push(char);
      // while(splittedArray.length != 0){
      //   console.log("entered");
      //   var char = splittedArray.splice(i,1);
      //   if (movie.length == i) splittedArray.shift();
      //   movie.push(char)
    // }

    }
    movie = movie.toString().replace(",", '').trim();



    if(movie.charAt(i) !== " " && movie.charAt(i) === movie.charAt(i).toUpperCase() && movie.charAt(i+1) === " " && movie.charAt(i+2) === movie.charAt(i+2).toUpperCase() && movie.charAt(i+2) !== " " && movie.charAt(i+3) === " " && movie.charAt(i+4) !== " " && movie.charAt(i+4) === movie.charAt(i+4).toUpperCase() && movie.charAt(i+5) === " "){
      var anotherArray = [];
      var splittedArray = movie.split("");
      movie = []
      while(splittedArray.length != 0){

        var char = splittedArray.splice(i,1);
        if (movie.length < 3) splittedArray.shift();
        else if (movie.length == 3) movie.push(" ");
        movie.push(char)
      }

    }

    movie = movie.toString().replace(",", '').trim();

    if(movie.charAt(i) !== " " && movie.charAt(i) === movie.charAt(i).toUpperCase() && movie.charAt(i+1) === " " && movie.charAt(i+2) === movie.charAt(i+2).toUpperCase() && movie.charAt(i+2) !== " " && movie.charAt(i+3) === " " && movie.charAt(i+4) !== " " && movie.charAt(i+4) === movie.charAt(i+4).toUpperCase() && movie.length > i+5 && movie.charAt(i+5) === movie.charAt(i+5).toLowerCase() && movie.charAt(i+5) !== " "){

      var anotherArray = [];
      var splittedArray = movie.split("");
      movie = [];
      while(splittedArray.length != 0){

        var char = splittedArray.splice(i,1);
        if (movie.length < 2) splittedArray.shift();
        else if (movie.length == 2) movie.push(" ");
        movie.push(char)
      }
    }
    movie = movie.toString().replace(",", '').trim();

    if(movie.charAt(i) !== " " && movie.charAt(i) === movie.charAt(i).toUpperCase() && movie.charAt(i+1) === " " && movie.charAt(i+2) === movie.charAt(i+2).toUpperCase() && movie.length == i+3){

      var anotherArray = [];
      var splittedArray = movie.split("");
      movie = []
      var char = splittedArray.splice(0,i);
      movie.push(char);
      var char = splittedArray.splice(0,1);
      splittedArray.shift()
      movie.push(char);
      var char = splittedArray.splice(0,1);
      movie.push(char);

      // while(splittedArray.length != 0){
      //   console.log("entered");
      //   var char = splittedArray.splice(i,1);
      //   if (movie.length == i) splittedArray.shift();
      //   movie.push(char)
    // }

    }
    movie = movie.toString().replace(",", '').trim();



    // if(movie.charAt(i) !== " " && movie.charAt(i) === movie.charAt(i).toUpperCase()){
    //
    //   if(movie.charAt(i+1) === " " && movie.charAt(i+2) === movie.charAt(i+2).toUpperCase() && movie.charAt(i+2) !== " " && movie.charAt(i+3) === " " && movie.charAt(i+4) === movie.charAt(i+4).toUpperCase() && movie.charAt(i+4) !== " "){
    //     console.log(movie.charAt(i));
    //     var anotherArray = [];
    //     var splittedArray = movie.split("");
    //     var char = splittedArray.splice(i,1);
    //     splittedArray.push(char);
    //     console.log(char);
    //     for(var a = i+1; a <= movie.length; a++){
    //       char = splittedArray.splice(a,1);
    //       splittedArray.push(char);
    //     }
    //     console.log("s " + splittedArray);
    //     // var anotherArray = ["testing"]
    //     // anotherArray.shift();
    //     // var yo = movie.split("");
    //     // var char = yo.splice(i,1);
    //     // anotherArray.push(char);
    //     // for(var a = i+1; a <= movie.length;a++){
    //     //   char = yo.splice(a,1);
    //     //   anotherArray.push(char)
    //     // }
    //     // movie=anotherArray;
    //
    //   }
    //   // if(movie.charAt(i+1) === " " && movie.charAt(i+2) === movie.charAt(i+2).toUpperCase() && movie.charAt(i+2) !== " " && movie.charAt(i+3) === " " && movie.charAt(i+4) === movie.charAt(i+4).toUpperCase() && movie.charAt(i+4) !== " "){
    //     // console.log(movie.charAt(i));
    //     // var anotherArray = ["testing"]
    //     // anotherArray.shift();
    //     // var yo = movie.split("");
    //     // var char = yo.splice(i,1);
    //     // anotherArray.push(char);
    //     // for(var a = i+1; a <= movie.length;a++){
    //     //   char = yo.splice(a,1);
    //     //   anotherArray.push(char)
    //     // }
    //     // movie=anotherArray;
    //     // for(var w = 0; w <= movie.length; w++){
    //     //   if(movie.charAt(i) === movie.charAt(i).toUpperCase() && movie.charAt(i) !== " "){
    //     //     if(movie.charAt(i+1) !== " " && movie.charAt(i+1) === movie.charAt(i+1).toUpperCase() && movie.charAt(i+2) === movie.charAt(i+2).toLowerCase() && movie.charAt(i+2) !== " "){
    //     //       c123saonsole.log("y");
    //     //     }
    //     //   }
    //     // }
    //   }
    // // }
  }
  console.log(basicBasic + " | " + movieBasic + " -> " + movie);
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

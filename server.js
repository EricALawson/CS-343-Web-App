var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var quizListjson = require("./public/JSON/quizlist.json");
var axios = require("axios");
var fs = require("fs");
var urlParser = bodyParser.urlencoded({ extended: false });

var userFuncs = require("./node_scripts/db_functions.js");
var $ = require("jquery");
//FIREBASE CONFIG
var admin = require("firebase-admin");
require("firebase/database");

var serviceAccount = require("./public/JSON/gameme-6de77-44daabfc2427.json");
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gameme-6de77.firebaseio.com"
});
var db = admin.database();
//------------------------------------------------------------
app.use("/public", express.static(__dirname + "/public"));
//------------------------------------------------------------
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//------------------------------------------------------------
app.get("/api/quiz/get", function(req, res) {
  //Pulls questions from DB and sends to Client
  var ref = db.ref("Questions");
  ref.once("value").then(snap => {
    //console.log(snap.val());
    var qID = [];
    var quest = [];

    var num = Math.round(Math.random() * 40);
    qID.push(num);
    for (var i = 0; i < 10; i++) {
      while (qID.indexOf(num) != -1) {
        num = Math.round(Math.random() * 40);
      }
      qID.push(num);
    }

    qID.sort(function(a, b) {
      return a - b;
    });
    for (var i = 0; i < 10; i++) quest.push(snap.val()[qID[i]]);

    res.status(200).send({ questions: quest });
  });
});
//------------------------------------------------------------
var anonUser=[]

function stringToInt(str){
  return parseInt(str.split('').map((val)=>{
    return val.charCodeAt(0);
  }).reduce((val,sum)=>{
    return val+""+sum;
  }));
}
app.post("/api/quiz/post", urlParser, function(req, res) {
  console.log(req.body.uid.indexOf("cookie:"));
  if (typeof req.body.uid !== "undefined") {
    if(req.body.uid.indexOf("cookie:")!=-1){
      var user = req.body.uid;
      delete req.body.uid;
      console.log(user);
      user=user.substring(7);
      user= stringToInt(user);
      anonUser[user%1000]=req.body;
    }
    else{
    var user = req.body.uid;
    delete req.body.uid;
    var ref = db.ref("Users/" + user + "/QuizHistory");
    ref.push(req.body);
    }
  }

  // ref.once("value").then((snap)=>{
  // 	console.log(snap.val());
  // })

  res.sendFile(path.join(__dirname + "/public/recommendation.html"));
});
//------------------------------------------------------------

//var ref = db.ref();
//------------------------------------------------------------
//var questions= require("./public/JSON/questions.json");
// ref.set(questions);

// ref.once("value").then(function(snap) {
//   console.log(snap.val());
// });
//------------------------------------------------------------
app.listen(3000, function() {
  console.log(`Server has started.`);
});

//POST METHOD FROM DATABASE
// axios({
// 	url: "https://api-v3.igdb.com/games/?fields=name",
//   method: 'POST',
//   headers: {
//       'Accept': 'application/json',
//       'user-key': "4f1ba193c658636447acbc2930a997df"

// 	}
// })
//   .then(response => {
// 			console.log(response.data);
//   })
//   .catch(err => {
//       console.error(err);
// 	});

//  userFuncs.insertGameRec( "Space Engineers" );
// //userFuncs.deleteGameRec( "-LdbuiKXVFdv2oithkLH" );
// userFuncs.insertQuiz( "My First Quiz" );
// // userFuncs.deleteQuiz( "-LdcAFXl64EmL3q_7zgA" );

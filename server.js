
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var axios = require("axios");
var fs = require("fs");
var urlParser = bodyParser.urlencoded({ extended: false });


var userFuncs = require("./node_scripts/db_functions.js");
var $ = require("jquery");
//FIREBASE CONFIG

require("firebase/database");
var admin = require("firebase-admin");
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
app.get("/api/reccomendation?",function(req,res){
    var quizResponse = {
        'SD' : -2,
        'MD' : -1,
        'N' : 0,
        'MA' : 1,
        'SA' : 2
    }
    var gameArray = [];
    const numGamesReturned = 6;
    var userid;
    console.log(req.query.userid);
    var gameList = db.ref('/Questions/').once('value').then( (questionList) => {
        return db.ref('/Users/' + req.query.userid + '/QuizHistory/').once('value').then ((quizlist) => {
            var tagWeights = {}
            quizlist.forEach((quiz) => {
                quiz.forEach((question) => {
                    var questionNumber = question.key.substring(1); //because it has a leading Q.
                    //console.log("question number: " + questionNumber)
                    var tagsArray = questionList.val()[questionNumber].tags.forEach((tag) => {
                        if (tagWeights[tag.tag]) {
                            tagWeights[tag.tag] += quizResponse[question.val()] * tag.multiplier;
                        } else {
                            tagWeights[tag.tag] = quizResponse[question.val()] * tag.multiplier;
                        }
                    })
                })
            })
            return tagWeights;
        })
    }).then((tagWeights) => {
        //console.log(tagWeights)
        return db.ref('gameCache').orderByChild('reviewRatio').once('value').then( (data) => {
            //console.log(data.val())
            data.forEach( (snapshot) => {
                gameJSON = snapshot.val()
                gameArray.push(gameJSON)
            })
            return;
        }).then( () => {
            return tagWeights;
        })

    }).then( (tagWeights) => {
        //generate 500 random indices.
        gameSublist = [];
        //console.log(gameArray.length)
        while (gameSublist.length < 500) {
            var index = Math.floor(Math.random() * gameArray.length);
            var check = Math.floor(Math.random() * gameArray.length);
            //console.log("index=" + index + " check=" + check)
            if (check <= index) { //creates random index weighted by position in gameArray, which should be sorted by popularity.
                if (gameArray[index].tags) {
                    gameSublist.push(gameArray[index])
                }
            }
        }
        gameSublist.forEach( (gameJSON) => {
            //console.log(gameSublist)
            gameWeight = 0;
            //console.log("before failing foreach call " + gameJSON)
            gameJSON.tags.forEach( (tag) => {
                if (tagWeights[tag]) {
                    gameWeight += tagWeights[tag]
                }
            })
            gameJSON.weight = gameWeight;
        })

        gameSublist.sort( (game1, game2) => {
            if (game1.weight < game2.weight) {return 1}
            else if (game1.weight == game2.weight) {return 0}
            else {return -1}
        })
        bestGames = gameSublist.splice(0, numGamesReturned);
        //console.log(bestGames)
        return bestGames;
    }).then( (bestGames) => {
        res.status(200).send(bestGames);

    })
})
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
  if (typeof req.body.uid !== "undefined") {
    if(req.body.uid.indexOf("cookie:")!=-1){
      var user = req.body.uid;
      delete req.body.uid;
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

  res.sendFile(path.join(__dirname + "/Public/recommendation.html"));
});
//------------------------------------------------------------

//var ref = db.ref();
//------------------------------------------------------------
//var questions= require("./public/JSON/questions.json");
// ref.set(questions);

// ref.once("value").then(function(snap) {
//   console.log(snap.val());
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

var reviewThreshold = 65;
const https = require('https');
const cheerio = require('cheerio');
const apikey = 'FED0454572CB5A53E4CD81A2E2B05CBF';
const gamelist_API_URL = 'https://api.steampowered.com/IStoreService/GetAppList/v1/?key=' + apikey + '&include_games=1';
const cacheWriteDelay = 1000 //milliseconds between writing each game to a cache file.
updateGameCache() //once on start-up.
const cacheUpdateFrequency = 86400000 // 24 hours
setInterval(function() {
    updateGameCache();
}, cacheUpdateFrequency);

function updateGameCache() {
    var gameList = new Promise((resolve, reject) => {
        https.get(gamelist_API_URL, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                //var games = JSON.parse(data).applist.apps;
                var games = JSON.parse(data).response.apps;
                console.log("before resolve.")
                resolve(games);
            });
        }).on("error", (err) => {
            console.log("updateGameCache Error: " + err.message);
            reject();
        });
    }).then((games) => {
        console.log("Steam game API called successfully, writing to file");
        var gameWriteLoop = setInterval(function() {
            if (games.length > 0) {
                var game = games.pop();
                webscrapeGame(game).then( (gameJSON) => {
                    writeCacheFile(gameJSON);
                })
            } else {
                console.log("game list empty, ending write loop");
                clearInterval(gameWriteLoop);
            }
        }, cacheWriteDelay)
    })
}

function writeCacheFile(gameJSON) {
    var ref = db.ref("/gameCache/" + gameJSON.appid);
    ref.update(gameJSON);
    /*    path = "cache/" + gameJSON.name + ".json";
        content = JSON.stringify(gameJSON);
        fs.writeFile(path, content, (err) => {
            if (err) {
                console.error("could not write file for " + JSON.stringify(gameJSON));
                console.error(err);
            }
        })*/
}
function webscrapeGame(gameJSON) {
    return promise = new Promise((resolve, reject) => {
        let appid = gameJSON.appid;
        url = 'https://store.steampowered.com/app/' + appid;
        tags = [];
        reviewScore = 0;
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                const $ = cheerio.load(data);
                $("a.app_tag").each((i, elem) => {
                    tag = $(elem).text().trim();
                    tags.push(tag);
                });
                var img_url = $("img.game_header_image_full").attr("src")
                gameJSON.img_url = img_url;
                var reviewRatio = 0;
                $("div.user_reviews_summary_row[data-tooltip-html]").each((i, elem) => {
                    var reviewString = $(elem).attr("data-tooltip-html").match(/\d+/);
                    if (reviewString != null) {
                        var reviewNum = parseInt(reviewString[0]);
                        if (reviewNum > reviewRatio) {
                            reviewRatio = reviewNum;
                        }
                    }
                });
                gameJSON.reviewRatio = reviewRatio;
                gameJSON.tags = tags;
                resolve(gameJSON);
            });
        }).on("error", (err) => {
            console.log("Error webscraping: " + gameJSON.name + "\n" + err.message);
            reject();
        });
    });
}
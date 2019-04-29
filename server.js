var express = require('express');
var app = express();
var bodyParser=require("body-parser");
var path = require('path');
var quizListjson = require("./public/JSON/quizlist.json");

var urlParser=bodyParser.urlencoded({extended: false});


// //FIREBASE CONFIG
// var firebase=require('firebase');

// var firebaseConfig = {
// 	apiKey: "AIzaSyDZWlHDj1CLih_xRVLGg2JSxTdWTMeGJXU",
// 	authDomain: "gameme-6de77.firebaseapp.com",
// 	databaseURL: "https://gameme-6de77.firebaseio.com",
// 	projectId: "gameme-6de77",
// 	storageBucket: "gameme-6de77.appspot.com",
// 	messagingSenderId: "1040081357704"
// };
// //FIREBASE
// firebase.initializeApp( firebaseConfig );

app.use('/public', express.static(__dirname + "/public"));


//const request = require("request");

var express = require('express');
var app = express();
var path = require('path');
var $ = require("jquery");
admin = require( 'firebase-admin' );
require( 'firebase/database' );
var userFuncs = require( './node_scripts/db_functions.js' );

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/quiz.html'));
});



//app.use(bodyParser.json({type:'application/json'}));

app.get('/api/quiz/get',function (req,res){
	res.status(200).send(quizListjson);
})

app.post('/api/quiz/post',urlParser,function(req,res){
	//TODO send user to recommendation page with recommendations from DB
	
	res.send({data:req.body});
})

var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./public/JSON/gameme-6de77-44daabfc2427.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gameme-6de77.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref();
ref.once("value").then(function(snap) {
  console.log(snap.val());
});

app.listen(3000, function() {
	console.log(`Server has started.`);
});

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://gameme-6de77.firebaseio.com'
});
db = admin.database();

//  userFuncs.insertGameRec( "Space Engineers" );
// //userFuncs.deleteGameRec( "-LdbuiKXVFdv2oithkLH" );
// userFuncs.insertQuiz( "My First Quiz" );
// // userFuncs.deleteQuiz( "-LdcAFXl64EmL3q_7zgA" );

// userFuncs.readQuizzes( "Jon" );
// userFuncs.readGameRecs( "Jon" );

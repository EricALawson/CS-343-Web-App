// const http = require('http');

// const hostname = '134.209.14.125';
// //const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });


// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

var express = require('express');
var app = express();
var path = require('path');
var firebase = require( 'firebase' );
var $ = require("jquery");
require( 'firebase/auth' );
require( 'firebase/firestore' );

// Configuration for Firebase
var config = {
	apiKey: "AIzaSyDZWlHDj1CLih_xRVLGg2JSxTdWTMeGJXU",
	authDomain: "gameme-6de77.firebaseapp.com",
	databaseURL: "https://gameme-6de77.firebaseio.com",
	projectId: "gameme-6de77",
	storageBucket: "gameme-6de77.appspot.com",
	messagingSenderId: "1040081357704"
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/quiz.html'));
});

app.use('/public', express.static(__dirname + "/public"));

//app.use(express.static(__dirname +'/public'));

app.listen(3000, function() {
	console.log(`Server has started.`);
});

firebase.initializeApp( config );
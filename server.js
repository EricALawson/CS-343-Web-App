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
var $ = require("jquery");
admin = require( 'firebase-admin' );
require( 'firebase/database' );
var userFuncs = require( './node_scripts/usersFunctions.js' );

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/public', express.static(__dirname + "/public"));

//app.use(express.static(__dirname +'/public'));

app.listen(3000, function() {
	console.log(`Server has started.`);
});

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://gameme-6de77.firebaseio.com'
});
db = admin.database();

 userFuncs.insertGameRec( "Space Engineers" );
//userFuncs.deleteGameRec( "-LdbuiKXVFdv2oithkLH" );
userFuncs.insertQuiz( "My First Quiz" );
// userFuncs.deleteQuiz( "-LdcAFXl64EmL3q_7zgA" );

userFuncs.readQuizzes( "Jon" );
userFuncs.readGameRecs( "Jon" );
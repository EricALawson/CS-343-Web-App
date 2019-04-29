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
var bodyParser=require("body-parser");
var path = require('path');
const admin = require( 'firebase-admin' );
require( 'firebase/auth' );
require( 'firebase/firestore' );

var urlParser=bodyParser.urlencoded({extended: false});

app.use('/public', express.static(__dirname + "/public"));

var quizListjson = require("./public/JSON/quizlist.json");
//const request = require("request");


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/quiz.html'));
});



//app.use(bodyParser.json({type:'application/json'}));

app.get('/api/quiz/get',function (req,res){
	res.status(200).send(quizListjson);
})

app.post('/api/quiz/post',urlParser,function(req,res){
	console.log(req.body);
	res.render('contact-sucess',{data:req.body});
})

//app.use(express.static(__dirname +'/public'));
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://gameme-6de77.firebaseio.com'
});



app.listen(3000, function() {
	console.log(`Server has started.`);
});


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
var cache = require('./cache.js')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

cache.updateGameCache() //once on start-up.
const cacheUpdateFrequency = 86400000 // 24 hours
setInterval(function() {
    cache.updateGameCache();
}, cacheUpdateFrequency);


app.use('/public', express.static(__dirname + "/public"));
//app.use(express.static(__dirname +'/public'));
app.listen(3000);